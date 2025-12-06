@echo off
echo ===== STARTING ALL SERVERS =====

echo Starting Spring Boot backend...
start "" cmd /k "cd /d D:\Projects\Chess-website\chess-backend && mvn spring-boot:run"

echo Starting React frontend...
start "" cmd /k "cd /d D:\Projects\Chess-website\chesswebsite && npm start"

echo Starting Socket.IO server...
start "" cmd /k "cd /d D:\Projects\Chess-website\chess-online-server && node server.js"

echo ===== ALL SERVERS STARTED =====