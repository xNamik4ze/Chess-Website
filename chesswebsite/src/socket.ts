import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";

let socket: Socket | null = null;

export const connectSocket = (): Socket | null => {
  if (socket) return socket;

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No JWT token found!");
    return null;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    autoConnect: true
  });

  socket.on("connect", () => {
    console.log("🔌 Connected:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;
