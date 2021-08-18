const express = require('express')();
const httpServer = require('http').createServer(express);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

let connectedUsers = [];

io.on('connection', (socket) => {
  connectedUsers.push(socket.id);
  console.log(connectedUsers);
  socket.on('disconnect', (reason) => {
    connectedUsers = connectedUsers.filter((user) => user != socket.id);
    console.log(connectedUsers);
    console.log(reason);
  });
});

httpServer.listen(8888);
