// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { ChessEngine } = require('./ChessEngine'); // JS file, CommonJS

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true }
});

const JWT_SECRET = process.env.JWT_SECRET || "ChangeThisSecretToAStrongOne12345";

// rooms map: roomId -> { id, engine, players: [{id,color,user}], createdAt }
const rooms = {};

// simple jwt check middleware
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth && socket.handshake.auth.token;
    if (!token) return next(new Error('No token'));
    const decoded = jwt.verify(String(token), JWT_SECRET);
    socket.data.user = decoded.sub || decoded.userId || null;
    return next();
  } catch (err) {
    return next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  function findWaitingRoom() {
    return Object.values(rooms).find(r => r.players.length === 1);
  }

  socket.on('joinGame', () => {
    let room = findWaitingRoom();
    if (!room) {
      const roomId = `room_${socket.id}_${Date.now()}`;
      room = { id: roomId, engine: new ChessEngine(), players: [], createdAt: Date.now() };
      rooms[roomId] = room;
    }

    const color = room.players.length === 0 ? 'w' : 'b';
    room.players.push({ id: socket.id, color, user: socket.data.user });
    socket.join(room.id);
    socket.data.roomId = room.id;
    socket.data.color = color;

    socket.emit('playerColor', color);

    // gửi luôn board hiện tại và turn cho player mới
    socket.emit('startGame', { board: room.engine.getBoard(), turn: room.engine.getTurn() });

    if (room.players.length === 2) {
      io.to(room.id).emit('bothPlayersJoined');
    } else {
      socket.emit('waitingForOpponent');
    }
  });

  socket.on('get_valid_moves', ({ r, c }) => {
    const room = rooms[socket.data.roomId];
    if (!room) return;
    const piece = room.engine.board[r][c];
    if (!piece || piece === "__") return;
    const moves = room.engine.getMoves(piece, r, c).map(([r, c]) => ({ r, c }));
    socket.emit('valid_moves', { moves });
  });

  socket.on('req_move', ({ from, to }) => {
    const roomId = socket.data.roomId;
    const color = socket.data.color;
    const room = rooms[roomId];
    if (!room) return socket.emit('error', { message: 'Not in room' });
    if (room.engine.getTurn() !== color) return socket.emit('invalidMove', { reason: 'Not your turn' });

    const result = room.engine.movePiece(from.r, from.c, to.r, to.c);
    if (!result.valid) return socket.emit('invalidMove', { from, to });

    // broadcast move ngay cả khi promotion
    io.to(roomId).emit('move_broadcast', {
      from, to, result, board: room.engine.getBoard(), turn: room.engine.getTurn()
    });

    // nếu promotion, yêu cầu chọn quân
    if (result.promotion) {
      io.to(socket.id).emit('promotion_required', {
        pos: result.promotionPos,
        color: room.engine.promotionColor,
        board: room.engine.getBoard(),
        notation: result.notation
      });
    }

    if (result.gameOver) {
      io.to(roomId).emit('game_over', { result: result.gameOver });
    }
  });

  socket.on('promote', ({ piece, pos }) => {
    const roomId = socket.data.roomId;
    const room = rooms[roomId];
    if (!room) return socket.emit('error', { message: 'Not in room' });

    const ok = room.engine.promote(piece);
    if (!ok) return socket.emit('error', { message: 'Promotion failed' });

    io.to(roomId).emit('promotion_done', {
      pos, piece, board: room.engine.getBoard(), turn: room.engine.getTurn()
    });
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    console.log('Disconnected', socket.id);
    const room = rooms[roomId];
    if (!room) return;

    room.players = room.players.filter(p => p.id !== socket.id);
    socket.to(roomId).emit('opponentLeft', { id: socket.id });
    if (room.players.length === 0) delete rooms[roomId];
  });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
server.listen(PORT, () => console.log(`Server listening ${PORT}`));
