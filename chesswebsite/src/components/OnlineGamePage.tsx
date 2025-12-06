import React, { useEffect, useState, useRef } from "react";
import { connectSocket, getSocket } from "../socket";
import UserInfoBar from "../components/UserInfoBar";
import ChessOnlineCanvas from "./ChessOnlineCanvas";

const OnlineGamePage: React.FC = () => {
  const [color, setColor] = useState<"w" | "b" | null>(null);
  const joinedRef = useRef(false);

  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;

    if (!joinedRef.current) {
      socket.emit("joinGame");
      joinedRef.current = true;
    }

    socket.on("playerColor", (c) => {
      setColor(c);
      console.log("🎨 You are:", c);
    });

    socket.on("startGame", () => {
      console.log("🎮 Game started!");
    });

    return () => {
      socket.off("playerColor");
      socket.off("startGame");
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <UserInfoBar />
      <h1>Online Chess</h1>

      <ChessOnlineCanvas playerColor={color} />

      {color && <p>You are playing as: {color}</p>}
    </div>
  );
};

export default OnlineGamePage;
