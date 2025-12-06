import React, { useEffect, useRef, useState } from "react";
import { getSocket } from "../socket";

type Cell = "__" | string;
type Board = Cell[][];

type Props = {
  playerColor: "w" | "b" | null;
};

type Position = { r: number; c: number };

const BOARD_DIM = 8;
const SQUARE_SIZE = 60;
const BEIGE = "#EEE";
const BROWN = "#555";

const ChessOnlineCanvas: React.FC<Props> = ({ playerColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [board, setBoard] = useState(Array(BOARD_DIM).fill(null).map(() => Array(BOARD_DIM).fill("__")));
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [selected, setSelected] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const pieceImagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const moveSoundRef = useRef<HTMLAudioElement | null>(null);
  const captureSoundRef = useRef<HTMLAudioElement | null>(null);

  // Load images & sounds
  useEffect(() => {
    const types = ["wp","wr","wn","wb","wq","wk","bp","br","bn","bb","bq","bk"];
    types.forEach(type => {
      const img = new Image();
      img.src = `/images/${type}.png`;
      pieceImagesRef.current[type] = img;
    });
    moveSoundRef.current = new Audio("/sounds/move.mp3");
    captureSoundRef.current = new Audio("/sounds/capture.mp3");
  }, []);

  // Draw board
  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < BOARD_DIM; r++) {
      for (let c = 0; c < BOARD_DIM; c++) {
        const x = c * SQUARE_SIZE;
        const y = r * SQUARE_SIZE;

        ctx.fillStyle = (r + c) % 2 === 0 ? BEIGE : BROWN;
        ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);

        if (selected && selected.r === r && selected.c === c) {
          ctx.fillStyle = "rgba(0,255,0,0.3)";
          ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
        }

        validMoves.forEach(move => {
          if (move.r === r && move.c === c) {
            ctx.fillStyle = "rgba(0,0,255,0.3)";
            ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
          }
        });

        const piece = board[r]?.[c];
        if (piece && piece !== "__" && pieceImagesRef.current[piece]) {
          ctx.drawImage(pieceImagesRef.current[piece], x, y, SQUARE_SIZE, SQUARE_SIZE);
        }
      }
    }

    // Nếu game over, phủ mờ màn hình
    if (gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2);
    }
  };

  useEffect(drawBoard, [board, selected, validMoves, gameOver]);

  // Handle click
  const handleClick = (e: MouseEvent) => {
    if (!playerColor || turn !== playerColor || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const c = Math.floor((e.clientX - rect.left) / SQUARE_SIZE);
    const r = Math.floor((e.clientY - rect.top) / SQUARE_SIZE);

    if (!board[r] || !board[r][c]) return;

    const socket = getSocket();
    if (!socket) return;

    // Normal select
    if (!selected) {
      const piece = board[r][c];
      if (piece.startsWith(playerColor)) {
        setSelected({ r, c });
        socket.emit("get_valid_moves", { r, c });
      }
      return;
    }

    // Move
    if (validMoves.some(m => m.r === r && m.c === c)) {
      socket.emit("req_move", { from: selected, to: { r, c } });
      setSelected(null);
      setValidMoves([]);
    } else {
      setSelected(null);
      setValidMoves([]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [selected, validMoves, board, turn, playerColor, gameOver]);

  // Socket events
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("startGame", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setSelected(null);
      setValidMoves([]);
      setGameOver(false);
    });

    socket.on("move_broadcast", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setSelected(null);
      setValidMoves([]);
      if (data.result.captured !== "__") captureSoundRef.current?.play();
      else moveSoundRef.current?.play();
    });

    socket.on("valid_moves", (data) => setValidMoves(data.moves));

    socket.on("promotion_done", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setSelected(null);
      setValidMoves([]);
    });

    socket.on("game_over", ({ result }) => {
      setGameOver(true);
      alert(`Game Over! Winner: ${result.winner}`);
    });

    return () => {
      socket.off("startGame");
      socket.off("move_broadcast");
      socket.off("valid_moves");
      socket.off("promotion_done");
      socket.off("game_over");
    };
  }, [playerColor, board, turn]);

  return <canvas ref={canvasRef} width={BOARD_DIM * SQUARE_SIZE} height={BOARD_DIM * SQUARE_SIZE} style={{ border: "2px solid black", cursor: gameOver ? "not-allowed" : "pointer" }} />;
};

export default ChessOnlineCanvas;
