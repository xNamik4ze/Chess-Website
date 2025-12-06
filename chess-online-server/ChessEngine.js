// ChessEngine.js
const initialBoard = [
  ["br","bn","bb","bq","bk","bb","bn","br"],
  ["bp","bp","bp","bp","bp","bp","bp","bp"],
  ["__","__","__","__","__","__","__","__"],
  ["__","__","__","__","__","__","__","__"],
  ["__","__","__","__","__","__","__","__"],
  ["__","__","__","__","__","__","__","__"],
  ["wp","wp","wp","wp","wp","wp","wp","wp"],
  ["wr","wn","wb","wq","wk","wb","wn","wr"]
];

class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.board = initialBoard.map(row => row.slice());
    this.turn = "w";
    this.moveHistory = [];
    this.whiteLost = [];
    this.blackLost = [];
    this.moved = { wk: false, bk: false, wr1: false, wr2: false, br1: false, br2: false };
  }

  getBoard() {
    return this.board.map(r => r.slice());
  }

  getTurn() {
    return this.turn;
  }

  inBounds(r, c) {
    return Number.isInteger(r) && Number.isInteger(c) && r >= 0 && r < 8 && c >= 0 && c < 8;
  }

  getMoves(piece, r, c) {
    const moves = [];
    if (!piece || piece.length < 2) return moves;
    if (!this.inBounds(r,c)) return moves;

    const type = piece[1];
    const color = piece[0];
    const board = this.board;

    const isEmpty = (rr, cc) => this.inBounds(rr,cc) && board[rr][cc] === "__";
    const isEnemy = (rr, cc) => this.inBounds(rr,cc) && board[rr][cc] !== "__" && board[rr][cc][0] !== color;

    const add = (dr, dc, repeat=false) => {
      let row = r + dr, col = c + dc;
      while (this.inBounds(row, col)) {
        if (isEmpty(row, col)) moves.push([row, col]);
        else { if (isEnemy(row,col)) moves.push([row, col]); break; }
        if (!repeat) break;
        row += dr; col += dc;
      }
    };

    switch (type) {
      case 'p': {
        const dir = color === 'w' ? -1 : 1;
        const startRow = color === 'w' ? 6 : 1;
        const one = r + dir;
        if (this.inBounds(one, c) && isEmpty(one, c)) {
          moves.push([one, c]);
          const two = r + 2*dir;
          if (r === startRow && this.inBounds(two, c) && isEmpty(two, c)) moves.push([two, c]);
        }
        [[r+dir, c-1],[r+dir, c+1]].forEach(([nr,nc]) => {
          if (this.inBounds(nr,nc) && isEnemy(nr,nc)) moves.push([nr,nc]);
        });
        break;
      }
      case 'r': [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>add(dr,dc,true)); break;
      case 'b': [[1,1],[-1,-1],[1,-1],[-1,1]].forEach(([dr,dc])=>add(dr,dc,true)); break;
      case 'q': [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].forEach(([dr,dc])=>add(dr,dc,true)); break;
      case 'k': 
        [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].forEach(([dr,dc])=>{
          const nr = r+dr, nc = c+dc;
          if (this.inBounds(nr,nc) && (isEmpty(nr,nc) || isEnemy(nr,nc))) moves.push([nr,nc]);
        });
        if (this.canCastle(r,'kingside')) moves.push([r,6]);
        if (this.canCastle(r,'queenside')) moves.push([r,2]);
        break;
      case 'n': [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([dr,dc])=>{
        const nr = r+dr, nc = c+dc;
        if (this.inBounds(nr,nc) && (isEmpty(nr,nc) || isEnemy(nr,nc))) moves.push([nr,nc]);
      }); break;
    }

    return moves;
  }

  canCastle(row, side) {
    const board = this.board;
    const moved = this.moved;
    const turn = this.turn;
    if (turn === 'w' && row === 7) {
      if (side === 'kingside') return !moved.wk && !moved.wr2 && board[7][5] === "__" && board[7][6] === "__";
      else return !moved.wk && !moved.wr1 && board[7][1] === "__" && board[7][2] === "__" && board[7][3] === "__";
    }
    if (turn === 'b' && row === 0) {
      if (side === 'kingside') return !moved.bk && !moved.br2 && board[0][5] === "__" && board[0][6] === "__";
      else return !moved.bk && !moved.br1 && board[0][1] === "__" && board[0][2] === "__" && board[0][3] === "__";
    }
    return false;
  }

  toChessNotation(fr, fc, tr, tc, piece, captured) {
    const files = ['a','b','c','d','e','f','g','h'];
    const ranks = ['8','7','6','5','4','3','2','1'];
    const to = files[tc] + ranks[tr];
    const pieceChar = piece[1].toLowerCase() === 'p' ? '' : piece[1].toUpperCase();
    return pieceChar + to;
  }

  movePiece(fromRow, fromCol, toRow, toCol) {
    const invalid = () => ({ valid: false, captured: undefined, promotion: false, promotionPos: null, castle: null, gameOver: null, notation: undefined });
    if (!this.inBounds(fromRow, fromCol) || !this.inBounds(toRow, toCol)) return invalid();

    const board = this.board;
    const piece = board[fromRow][fromCol];
    if (!piece || piece === "__") return invalid();

    const possible = this.getMoves(piece, fromRow, fromCol);
    const isValid = possible.some(m => m[0] === toRow && m[1] === toCol);
    if (!isValid) return invalid();

    const captured = board[toRow][toCol];
    const notation = this.toChessNotation(fromRow, fromCol, toRow, toCol, piece, captured);
    this.moveHistory.push({ notation, color: piece[0] });

    let castle = null;

    // castle logic
    if (piece === 'wk') {
      this.moved.wk = true;
      if (toRow === 7 && toCol === 6) { board[7][5] = board[7][7]; board[7][7] = "__"; this.moved.wr2 = true; castle = { side:'kingside' }; }
      else if (toRow === 7 && toCol === 2) { board[7][3] = board[7][0]; board[7][0] = "__"; this.moved.wr1 = true; castle = { side:'queenside' }; }
    } else if (piece === 'bk') {
      this.moved.bk = true;
      if (toRow === 0 && toCol === 6) { board[0][5] = board[0][7]; board[0][7] = "__"; this.moved.br2 = true; castle = { side:'kingside' }; }
      else if (toRow === 0 && toCol === 2) { board[0][3] = board[0][0]; board[0][0] = "__"; this.moved.br1 = true; castle = { side:'queenside' }; }
    }

    if (piece === 'wr' && fromCol === 0) this.moved.wr1 = true;
    if (piece === 'wr' && fromCol === 7) this.moved.wr2 = true;
    if (piece === 'br' && fromCol === 0) this.moved.br1 = true;
    if (piece === 'br' && fromCol === 7) this.moved.br2 = true;

    // apply move
    board[fromRow][fromCol] = "__";
    board[toRow][toCol] = piece;

    if (captured !== "__") {
      if (captured[0] === 'w') this.whiteLost.push(captured);
      else this.blackLost.push(captured);
    }

    // check vua bị ăn
    if (captured === 'wk' || captured === 'bk') {
      const winnerColor = captured === 'wk' ? 'b' : 'w';
      const winnerName = winnerColor === 'w' ? 'White' : 'Black';
      return {
        valid: true,
        captured,
        promotion: false,
        promotionPos: null,
        castle: null,
        gameOver: { winner: winnerName, message: `${winnerName} wins` },
        notation
      };
    }

    // tự động phong hậu nếu tốt lên cuối bảng
    if ((piece === 'wp' && toRow === 0) || (piece === 'bp' && toRow === 7)) {
      board[toRow][toCol] = piece[0] + 'q'; // luôn thành hậu
    }

    // toggle turn
    this.turn = this.turn === 'w' ? 'b' : 'w';

    return { valid:true, captured, promotion:false, promotionPos:null, castle, gameOver:null, notation };
  }

  allMovesFor(color='b') {
    const res = [];
    for (let r=0;r<8;r++){
      for (let c=0;c<8;c++){
        const piece = this.board[r][c];
        if (piece !== "__" && piece[0] === color) {
          const moves = this.getMoves(piece, r, c);
          for (const m of moves) res.push({ from:[r,c], to:m });
        }
      }
    }
    return res;
  }
}

module.exports = { ChessEngine };
