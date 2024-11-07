const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chatMessage', (msg) => {
    // Add timestamp to the message
    const timestamp = new Date().toLocaleTimeString(); // e.g., "2:15 PM"
    const messageWithTimestamp = { ...msg, timestamp };

    // Broadcast message with timestamp to all users
    io.emit('chatMessage', messageWithTimestamp);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

