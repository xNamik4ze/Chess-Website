import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import "../styles/ChessPage.css";
import "./LearnPage.tsx";
import Sidebar from "./Sidebar";

type MovePair = [number, number];
type MoveHistoryItem = { notation: string; color: string };

const ChessCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const boardRef = useRef<string[][]>([
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["__", "__", "__", "__", "__", "__", "__", "__"],
    ["__", "__", "__", "__", "__", "__", "__", "__"],
    ["__", "__", "__", "__", "__", "__", "__", "__"],
    ["__", "__", "__", "__", "__", "__", "__", "__"],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
  ]);
  const selectedRef = useRef<MovePair | null>(null);
  const validMovesRef = useRef<MovePair[]>([]);
  const moveHistoryRef = useRef<MoveHistoryItem[]>([]);
  const whiteLostRef = useRef<string[]>([]);
  const blackLostRef = useRef<string[]>([]);

  const turnRef = useRef<"w" | "b">("w");
  const gameOverRef = useRef<boolean>(false);

  const gameModeRef = useRef<"ai" | "pvp" | null>(null);
  const gameStartedRef = useRef<boolean>(false);

  const promotionRowRef = useRef<number | null>(null);
  const promotionColRef = useRef<number | null>(null);
  const promotionColorRef = useRef<string | null>(null);

  const whiteTimeRef = useRef<number>(600);
  const blackTimeRef = useRef<number>(600);
  const timerIntervalRef = useRef<number | null>(null);

  const movedRef = useRef({
    wk: false, bk: false,
    wr1: false, wr2: false,
    br1: false, br2: false
  });

  const pieceImagesRef = useRef<Record<string, HTMLImageElement | HTMLCanvasElement>>({});
  const moveSoundRef = useRef<HTMLAudioElement | null>(null);
  const captureSoundRef = useRef<HTMLAudioElement | null>(null);

  const SQUARE_SIZE = 67.5;
  const DIMENSION = 8;
  const LEFT_MARGIN = 20;
  const RIGHT_MARGIN = 20;
  const BOARD_TOP = 120;
  const BOARD_BOTTOM = 120;
  const BEIGE = "#f0d9b5";
  const BROWN = "#b58863";

  const getBoard = () => boardRef.current;
  const getSelected = () => selectedRef.current;
  const getValidMoves = () => validMovesRef.current;
  const getMoveHistory = () => moveHistoryRef.current;
  const getWhiteLost = () => whiteLostRef.current;
  const getBlackLost = () => blackLostRef.current;
  const getTurn = () => turnRef.current;
  const getGameMode = () => gameModeRef.current;
  const isGameOver = () => gameOverRef.current;

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // set canvas size
    canvas.width = SQUARE_SIZE * DIMENSION + LEFT_MARGIN + RIGHT_MARGIN;
    canvas.height = SQUARE_SIZE * DIMENSION + BOARD_TOP + BOARD_BOTTOM;

    // init audio refs
    moveSoundRef.current = new Audio("sounds/move.mp3");
    captureSoundRef.current = new Audio("sounds/capture.mp3");

    // Load piece images
    function loadImages() {
      const types = ["wp", "wr", "wn", "wb", "wq", "wk", "bp", "br", "bn", "bb", "bq", "bk"];
      let loaded = 0;
      types.forEach(type => {
        const img = new Image();
        img.src = `/images/${type}.png`;
        img.onload = () => {
          pieceImagesRef.current[type] = img;
          loaded += 1;
          if (loaded === types.length) drawBoard();
        };
        img.onerror = () => {
          // fallback placeholder canvas to avoid undefined drawImage
          const fallback = document.createElement("canvas");
          fallback.width = SQUARE_SIZE;
          fallback.height = SQUARE_SIZE;
          pieceImagesRef.current[type] = fallback;
          loaded += 1;
          if (loaded === types.length) drawBoard();
        };
      });
    }

    //Draw board
    function drawBoard() {
      const ctx = ctxRef.current!;
      const canvas = canvasRef.current!;

      ctx.fillStyle = 'rgba(145, 152, 203, 0.54)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const files = ['a','b','c','d','e','f','g','h'];
      const board = getBoard();

      for (let r = 0; r < DIMENSION; r++) {
        for (let c = 0; c < DIMENSION; c++) {
          const x = LEFT_MARGIN + c * SQUARE_SIZE;
          const y = BOARD_TOP + r * SQUARE_SIZE;

          const color = (r + c) % 2 === 0 ? BEIGE : BROWN;
          ctx.fillStyle = color;
          ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);

          const selected = getSelected();
          const validMoves = getValidMoves();
          if (selected && validMoves.some(m => m[0] === r && m[1] === c)) {
            ctx.fillStyle = "rgba(0,255,0,0.3)";
            ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
          }

          const piece = board[r][c];
          if (piece !== "__" && pieceImagesRef.current[piece]) {
            ctx.drawImage(pieceImagesRef.current[piece] as CanvasImageSource, x, y, SQUARE_SIZE, SQUARE_SIZE);
          }
        }
      }

      // files
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let c = 0; c < DIMENSION; c++) {
        const x = LEFT_MARGIN + c * SQUARE_SIZE + SQUARE_SIZE / 2;
        const y = BOARD_TOP + DIMENSION * SQUARE_SIZE + 10;
        ctx.fillText(files[c], x, y);
      }

      // ranks
      for (let r = 0; r < DIMENSION; r++) {
        const y = BOARD_TOP + r * SQUARE_SIZE + SQUARE_SIZE / 2;
        const x = LEFT_MARGIN / 2;
        ctx.fillText(String(8 - r), x, y);
      }

      drawPlayerInfo();
    }

    function drawPlayerInfo() {
      const ctx = ctxRef.current!;
      const canvas = canvasRef.current!;
      const avatarSize = 60;
      const blackY = 50;

      // draw player2 avatar
      const avatarImg2 = new Image();
      avatarImg2.src = '/images/player2.png';
      avatarImg2.onload = () => ctx.drawImage(avatarImg2, 10, blackY - avatarSize / 2, avatarSize, avatarSize);

      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("Người chơi 2 (Đen)", 70, blackY);

      let bx = 80;
      getWhiteLost().forEach(piece => {
        if (pieceImagesRef.current[piece]) {
          ctx.drawImage(pieceImagesRef.current[piece] as CanvasImageSource, bx, blackY + avatarSize / 2 - 10, 25, 25);
          bx += 28;
        }
      });

      const whiteY = canvas.height - 70;
      const avatarImg1 = new Image();
      avatarImg1.src = '/images/player1.png';
      avatarImg1.onload = () => ctx.drawImage(avatarImg1, 10, whiteY - avatarSize / 2, avatarSize, avatarSize);

      ctx.fillStyle = "black";
      ctx.fillText("Người chơi 1 (Trắng)", 70, whiteY);

      let wx = 80;
      getBlackLost().forEach(piece => {
        if (pieceImagesRef.current[piece]) {
          ctx.drawImage(pieceImagesRef.current[piece] as CanvasImageSource, wx, whiteY + avatarSize / 2 - 10, 25, 25);
          wx += 28;
        }
      });
    }

    // ---------- UI updates ----------
    function updateSidebar() {
      const turnEl = document.getElementById("turn");
      const whiteLostEl = document.getElementById("white-lost");
      const blackLostEl = document.getElementById("black-lost");
      if (turnEl) turnEl.textContent = `Turn: ${getTurn() === "w" ? "White" : "Black"}`;
      if (whiteLostEl) whiteLostEl.textContent = getWhiteLost().join(" ");
      if (blackLostEl) blackLostEl.textContent = getBlackLost().join(" ");
    }

    function updateMoveHistory() {
      const movesList = document.getElementById('moves-list');
      if (!movesList) return;
      movesList.innerHTML = '';

      const history = getMoveHistory();
      for (let i = 0; i < history.length; i += 2) {
        const whiteMove = history[i];
        const blackMove = history[i + 1];
        const li = document.createElement('li');
        li.innerHTML = `
          ${whiteMove ? getMoveIcon(whiteMove.notation, whiteMove.color) : ''}
          ${blackMove ? ' | ' + getMoveIcon(blackMove.notation, blackMove.color) : ''}
        `;
        movesList.appendChild(li);
      }
      movesList.scrollTop = movesList.scrollHeight;
    }

    function getMoveIcon(move: string, color: string) {
      const pieceMap: Record<string, string> = {R: 'r', N: 'n', B: 'b', Q: 'q', K: 'k'};
      const pieceChar = move[0];
      const square = pieceChar.match(/[RNBQK]/) ? move.slice(1) : move;
      const piece = pieceMap[pieceChar] || 'p';
      const imgSrc = `images/${color}${piece}.png`;
      return `<img src="${imgSrc}" alt="${piece}" width="20" style="vertical-align:middle;" /> ${square}`;
    }

    //Game logic
    function getSquare(x: number, y: number): MovePair {
      return [
        Math.floor((y - BOARD_TOP) / SQUARE_SIZE),
        Math.floor((x - LEFT_MARGIN) / SQUARE_SIZE)
      ];
    }

    function getMoves(piece: string, r: number, c: number): MovePair[] {
      const type = piece[1];
      const color = piece[0];
      const moves: MovePair[] = [];

      const board = getBoard();
      const isEnemy = (row: number, col: number) => board[row][col] !== "__" && board[row][col][0] !== color;
      const isEmpty = (row: number, col: number) => board[row][col] === "__";

      const add = (dr: number, dc: number, repeat = false) => {
        let row = r + dr, col = c + dc;
        while (row >= 0 && row < 8 && col >= 0 && col < 8) {
          if (isEmpty(row, col)) moves.push([row, col]);
          else { if (isEnemy(row, col)) moves.push([row, col]); break; }
          if (!repeat) break;
          row += dr; col += dc;
        }
      };

      switch (type) {
        case "p": {
          const dir = color === "w" ? -1 : 1;
          const startRow = color === "w" ? 6 : 1;
          if (r + dir >= 0 && r + dir < 8 && isEmpty(r + dir, c)) {
            moves.push([r + dir, c]);
            if (r === startRow && isEmpty(r + 2 * dir, c)) moves.push([r + 2 * dir, c]);
          }
          [-1, 1].forEach(dc => {
            const nr = r + dir, nc = c + dc;
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && isEnemy(nr, nc)) moves.push([nr, nc]);
          });
          break;
        }
        case "r":
          [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => add(dr,dc,true));
          break;
        case "b":
          [[1,1],[-1,-1],[1,-1],[-1,1]].forEach(([dr,dc]) => add(dr,dc,true));
          break;
        case "q":
          [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].forEach(([dr,dc]) => add(dr,dc,true));
          break;
        case "k":
          [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].forEach(([dr,dc]) => add(dr,dc,false));
          if (canCastle(r, 'kingside')) moves.push([r,6]);
          if (canCastle(r, 'queenside')) moves.push([r,2]);
          break;
        case "n":
          [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([dr,dc]) => {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && (isEmpty(nr,nc) || isEnemy(nr,nc))) moves.push([nr,nc]);
          });
          break;
      }

      return moves;
    }

    function canCastle(row: number, side: 'kingside' | 'queenside') {
      const board = getBoard();
      const moved = movedRef.current;
      const turn = getTurn();
      if (turn === 'w' && row === 7) {
        if (side === 'kingside') {
          return !moved.wk && !moved.wr2 && board[7][5] === "__" && board[7][6] === "__";
        } else {
          return !moved.wk && !moved.wr1 && board[7][1] === "__" && board[7][2] === "__" && board[7][3] === "__";
        }
      }
      if (turn === 'b' && row === 0) {
        if (side === 'kingside') {
          return !moved.bk && !moved.br2 && board[0][5] === "__" && board[0][6] === "__";
        } else {
          return !moved.bk && !moved.br1 && board[0][1] === "__" && board[0][2] === "__" && board[0][3] === "__";
        }
      }
      return false;
    }

    function checkPromotion(row: number, col: number, piece: string) {
      if ((piece === 'wp' && row === 0) || (piece === 'bp' && row === 7)) {
        promotionRowRef.current = row;
        promotionColRef.current = col;
        promotionColorRef.current = piece[0];
        const modal = document.getElementById('promotion-modal');
        if (modal) modal.style.display = 'flex';
        document.querySelectorAll<HTMLImageElement>('#promotion-modal img').forEach(img => {
          const type = img.alt.toLowerCase().charAt(0);
          img.src = `images/${promotionColorRef.current}${type}.png`;
        });
      }
    }

    function promote(newPiece: string) {
      if (promotionRowRef.current === null || promotionColRef.current === null || promotionColorRef.current === null) return;
      boardRef.current[promotionRowRef.current][promotionColRef.current] = promotionColorRef.current + newPiece;
      const modal = document.getElementById('promotion-modal');
      if (modal) modal.style.display = 'none';
      promotionRowRef.current = null;
      promotionColRef.current = null;
      promotionColorRef.current = null;
      drawBoard();
    }

    function toChessNotation(fromRow: number, fromCol: number, toRow: number, toCol: number, piece: string, captured: string) {
      const files = ['a','b','c','d','e','f','g','h'];
      const ranks = ['8','7','6','5','4','3','2','1'];
      const to = files[toCol] + ranks[toRow];
      const pieceChar = piece[1].toLowerCase() === 'p' ? '' : piece[1].toUpperCase();
      return pieceChar + to;
    }

    function movePiece(fromRow: number, fromCol: number, toRow: number, toCol: number) {
      const board = getBoard();
      const piece = board[fromRow][fromCol];
      const captured = board[toRow][toCol];

      const isValid = getMoves(piece, fromRow, fromCol).some(m => m[0] === toRow && m[1] === toCol);
      if (!isValid) return;

      if (captured !== "__") {
        captureSoundRef.current?.play();
        if (captured[0] === "w") getWhiteLost().push(captured);
        else getBlackLost().push(captured);
      } else {
        moveSoundRef.current?.play();
      }

      getMoveHistory().push({
        notation: toChessNotation(fromRow, fromCol, toRow, toCol, piece, captured),
        color: piece[0]
      });
      updateMoveHistory();

      // Castling handling
      if (piece === "wk") {
        movedRef.current.wk = true;
        if (toRow === 7 && toCol === 6) {
          board[7][5] = board[7][7];
          board[7][7] = "__";
          movedRef.current.wr2 = true;
        } else if (toRow === 7 && toCol === 2) {
          board[7][3] = board[7][0];
          board[7][0] = "__";
          movedRef.current.wr1 = true;
        }
      }
      if (piece === "bk") {
        movedRef.current.bk = true;
        if (toRow === 0 && toCol === 6) {
          board[0][5] = board[0][7];
          board[0][7] = "__";
          movedRef.current.br2 = true;
        } else if (toRow === 0 && toCol === 2) {
          board[0][3] = board[0][0];
          board[0][0] = "__";
          movedRef.current.br1 = true;
        }
      }

      if (piece === "wr" && fromCol === 0) movedRef.current.wr1 = true;
      if (piece === "wr" && fromCol === 7) movedRef.current.wr2 = true;
      if (piece === "br" && fromCol === 0) movedRef.current.br1 = true;
      if (piece === "br" && fromCol === 7) movedRef.current.br2 = true;

      board[fromRow][fromCol] = "__";
      board[toRow][toCol] = piece;

      if (captured === "wk" || captured === "bk") {
        drawBoard();
        setTimeout(() => {
          showGameOver(captured === "wk" ? "Black wins! Game Over." : "White wins! Game Over.");
          gameOverRef.current = true;
        }, 100);
        return;
      }

      checkPromotion(toRow, toCol, piece);
      turnRef.current = turnRef.current === "w" ? "b" : "w";

      startTimer();
      updateSidebar();
      drawBoard();

      if (getGameMode() === 'ai' && getTurn() === 'b' && !isGameOver()) {
        setTimeout(() => { makeAIMove(); }, 500);
      }
    }

    // AI
    function makeAIMove() {
      const allMoves: { from: MovePair; to: MovePair }[] = [];
      const board = getBoard();

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = board[r][c];
          if (piece !== "__" && piece[0] === "b") {
            const moves = getMoves(piece, r, c);
            for (const m of moves) allMoves.push({ from: [r, c], to: m });
          }
        }
      }

      if (allMoves.length === 0) return;
      const move = allMoves[Math.floor(Math.random() * allMoves.length)];
      const [fromRow, fromCol] = move.from;
      const [toRow, toCol] = move.to;
      movePiece(fromRow, fromCol, toRow, toCol);
    }

    // Timer
    function startTimer() {
      if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = window.setInterval(() => {
        if (isGameOver()) {
          if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
          return;
        }

        if (getTurn() === 'w') {
          whiteTimeRef.current -= 1;
          if (whiteTimeRef.current <= 0) {
            if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
            showGameOver("Đen thắng! Trắng hết giờ.");
            gameOverRef.current = true;
            return;
          }
        } else {
          blackTimeRef.current -= 1;
          if (blackTimeRef.current <= 0) {
            if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
            showGameOver("Trắng thắng! Đen hết giờ.");
            gameOverRef.current = true;
            return;
          }
        }
        updateClocks();
      }, 1000) as unknown as number;
    }

    function updateClocks() {
      const whiteClock = document.getElementById("white-clock");
      const blackClock = document.getElementById("black-clock");
      if (whiteClock) whiteClock.innerText = `⏱️ Trắng: ${formatTime(whiteTimeRef.current)}`;
      if (blackClock) blackClock.innerText = `⏱️ Đen: ${formatTime(blackTimeRef.current)}`;
    }

    function formatTime(seconds: number) {
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      return `${m}:${s}`;
    }

    // Game state management
    function startGame(mode: "ai" | "pvp") {
      gameModeRef.current = mode;
      gameStartedRef.current = true;

      gameOverRef.current = false;
      turnRef.current = "w";
      whiteTimeRef.current = 600;
      blackTimeRef.current = 600;
      selectedRef.current = null;
      validMovesRef.current = [];
      whiteLostRef.current = [];
      blackLostRef.current = [];
      moveHistoryRef.current = [];

      movedRef.current = { wk: false, bk: false, wr1: false, wr2: false, br1: false, br2: false };

      const modeSelect = document.getElementById("mode-select");
      if (modeSelect) modeSelect.style.display = "none";
      const mainPlayBtn = document.getElementById("main-play-button") as HTMLButtonElement | null;
      if (mainPlayBtn) mainPlayBtn.disabled = true;

      drawBoard();
      startTimer();
      updateSidebar();

      if (getGameMode() === "ai" && getTurn() === "b") {
        setTimeout(() => { makeAIMove(); }, 500);
      }
    }

    function restartGame() {
      boardRef.current = [
        ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
        ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
        ["__", "__", "__", "__", "__", "__", "__", "__"],
        ["__", "__", "__", "__", "__", "__", "__", "__"],
        ["__", "__", "__", "__", "__", "__", "__", "__"],
        ["__", "__", "__", "__", "__", "__", "__", "__"],
        ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
        ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
      ];
      whiteLostRef.current = [];
      blackLostRef.current = [];
      selectedRef.current = null;
      validMovesRef.current = [];
      turnRef.current = "w";
      gameOverRef.current = false;
      movedRef.current = { wk: false, bk: false, wr1: false, wr2: false, br1: false, br2: false };
      updateSidebar();
      drawBoard();
      gameStartedRef.current = false;
      const mainPlayBtn = document.getElementById("main-play-button") as HTMLButtonElement | null;
      if (mainPlayBtn) mainPlayBtn.disabled = false;
    }

    function quitGame() {
      try { window.close(); } catch { window.location.reload(); }
    }

    function showGameOver(message: string) {
      const existing = document.getElementById("game-over-overlay");
      if (existing) existing.remove();

      const overlay = document.createElement("div");
      overlay.id = "game-over-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
      overlay.style.color = "#fff";
      overlay.style.display = "flex";
      overlay.style.flexDirection = "column";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.fontSize = "36px";
      overlay.style.zIndex = "1000";

      const text = document.createElement("div");
      text.innerText = message;

      const button = document.createElement("button");
      button.innerText = "OK";
      button.style.marginTop = "20px";
      button.style.fontSize = "20px";
      button.style.padding = "10px 20px";
      button.style.cursor = "pointer";

      button.addEventListener("click", () => {
        document.body.removeChild(overlay);
        setTimeout(() => { restartGame(); }, 0);
      });

      overlay.appendChild(text);
      overlay.appendChild(button);
      document.body.appendChild(overlay);
    }

    // Event handler for canvas clicks
    const onCanvasClick = (e: MouseEvent) => {
      if (!gameStartedRef.current || gameOverRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const offsetX = (e as MouseEvent).clientX - rect.left;
      const offsetY = (e as MouseEvent).clientY - rect.top;

      const [row, col] = getSquare(offsetX, offsetY);
      if (row < 0 || row >= 8 || col < 0 || col >= 8) return;
      const board = getBoard();
      const piece = board[row][col];

      if (selectedRef.current) {
        const isValid = validMovesRef.current.some(m => m[0] === row && m[1] === col);
        if (isValid) {
          const captured = board[row][col];
          if (captured !== "__") {
            captureSoundRef.current?.play();
            if (captured[0] === "w") whiteLostRef.current.push(captured);
            else blackLostRef.current.push(captured);
          } else {
            moveSoundRef.current?.play();
          }

          const fromPiece = board[selectedRef.current[0]][selectedRef.current[1]];
          moveHistoryRef.current.push({
            notation: toChessNotation(selectedRef.current[0], selectedRef.current[1], row, col, fromPiece, captured),
            color: fromPiece[0]
          });
          updateMoveHistory();

          if (fromPiece === "wk") {
            movedRef.current.wk = true;
            if (row === 7 && col === 6) {
              board[7][5] = board[7][7];
              board[7][7] = "__";
              movedRef.current.wr2 = true;
            } else if (row === 7 && col === 2) {
              board[7][3] = board[7][0];
              board[7][0] = "__";
              movedRef.current.wr1 = true;
            }
          }
          if (fromPiece === "bk") {
            movedRef.current.bk = true;
            if (row === 0 && col === 6) {
              board[0][5] = board[0][7];
              board[0][7] = "__";
              movedRef.current.br2 = true;
            } else if (row === 0 && col === 2) {
              board[0][3] = board[0][0];
              board[0][0] = "__";
              movedRef.current.br1 = true;
            }
          }

          if (fromPiece === "wr" && selectedRef.current[1] === 0) movedRef.current.wr1 = true;
          if (fromPiece === "wr" && selectedRef.current[1] === 7) movedRef.current.wr2 = true;
          if (fromPiece === "br" && selectedRef.current[1] === 0) movedRef.current.br1 = true;
          if (fromPiece === "br" && selectedRef.current[1] === 7) movedRef.current.br2 = true;

          board[selectedRef.current[0]][selectedRef.current[1]] = "__";
          if (captured === "wk" || captured === "bk") {
            board[row][col] = "__";
            board[row][col] = fromPiece;
            drawBoard();
            setTimeout(() => {
              showGameOver(captured === "wk" ? "Black wins! Game Over." : "White wins! Game Over.");
              gameOverRef.current = true;
            }, 100);
            return;
          }

          board[row][col] = fromPiece;

          checkPromotion(row, col, fromPiece);
          selectedRef.current = null;
          validMovesRef.current = [];
          if (!promotionRowRef.current) drawBoard();

          turnRef.current = turnRef.current === "w" ? "b" : "w";

          startTimer();
          updateSidebar();
        } else {
          selectedRef.current = null;
          validMovesRef.current = [];
        }
      } else {
        if (piece !== "__" && piece[0] === getTurn() && !(getGameMode() === 'ai' && getTurn() === 'b')) {
          selectedRef.current = [row, col];
          validMovesRef.current = getMoves(piece, row, col);
        }
      }
      drawBoard();
      if (getGameMode() === 'ai' && getTurn() === 'b' && !isGameOver()) {
        setTimeout(() => { makeAIMove(); }, 500);
      }
    };

    canvas.addEventListener("click", onCanvasClick);

    // Bind UI controls (these elements are rendered in JSX below)
    const onMainPlayClick = () => {
      const modeDropdown = document.getElementById("mode-dropdown") as HTMLSelectElement | null;
      const mode = modeDropdown?.value;
      if (!mode) {
        alert("Vui lòng chọn chế độ chơi trước khi bắt đầu!");
        return;
      }
      startGame(mode === "ai" ? "ai" : "pvp");
    };

    const mainPlayBtn = document.getElementById("main-play-button");
    mainPlayBtn?.addEventListener("click", onMainPlayClick);

    // Promotion modal handlers
    const promotionHandler = (e: Event) => {
      const target = e.target as HTMLImageElement;
      if (!target) return;
      const char = target.alt?.toLowerCase().charAt(0);
      if (char) promote(char);
    };
    document.querySelectorAll('#promotion-modal img').forEach(img => img.addEventListener('click', promotionHandler));

    const restartBtn = document.getElementById("restart-button");
    restartBtn?.addEventListener("click", restartGame);
    const quitBtn = document.getElementById("quit-button");
    quitBtn?.addEventListener("click", quitGame);

    // initial
    updateClocks();
    loadImages();

    // cleanup
    return () => {
      canvas.removeEventListener("click", onCanvasClick);
      mainPlayBtn?.removeEventListener("click", onMainPlayClick);
      document.querySelectorAll('#promotion-modal img').forEach(img => img.removeEventListener('click', promotionHandler));
      restartBtn?.removeEventListener("click", restartGame);
      quitBtn?.removeEventListener("click", quitGame);
      if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
    };
  }, []); // run once

  // --- JSX UI (keeps same IDs used in logic above)
  return (
    <div
      style={{
        margin: 0,
        background: "linear-gradient(135deg, #1e1e2f, #2c3e50)",
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('/images/chess-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
    >
      <Sidebar />

      <div className="container">
        <div id="board-container">
          <canvas ref={canvasRef} id="board" width={540} height={540}></canvas>
        </div>

        <div id="right-panel">
          <div id="clock-container">
            <div id="black-clock"></div>
            <div id="white-clock"></div>
          </div>
          <div id="turn" style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            Turn: White
          </div>
          <div id="move-history-container">
            <div id="move-history">
              <h3>LỊCH SỬ NƯỚC ĐI</h3>
              <ol id="moves-list"></ol>
            </div>
          </div>
          <div id="mode-select">
            <label>Chọn chế độ:</label>
            <select id="mode-dropdown">
              <option value="">-- Chọn chế độ --</option>
              <option value="pvp">PvP</option>
              <option value="ai">Chơi với Máy</option>
            </select>
          </div>
        </div>

        <div id="main-play-button-container">
          <button id="main-play-button">Play</button>
        </div>
      </div>

      <div id="promotion-modal" className="promotion-modal">
        <p>Chọn quân để phong cấp</p>
        <img src="" alt="q" className="promote-piece" />
        <img src="" alt="r" className="promote-piece" />
        <img src="" alt="b" className="promote-piece" />
        <img src="" alt="n" className="promote-piece" />
      </div>
    </div>
  );
};

export default ChessCanvas;

