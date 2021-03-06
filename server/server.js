const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieparser = require('cookie-parser');
const route = require('./routes/route');
///connect to mongodb database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb!');
  })
  .catch((e) => {
    console.log(e);
  });

//create socket io instance in httpserver
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(route);
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Get success' });
});
//socket io connection

let connectedUsers = [];
io.on('connection', (socket) => {
  ///add user to connected users
  connectedUsers.push(socket.id);
  console.log(connectedUsers);

  ////remove user from the connected users array
  socket.on('disconnect', (reason) => {
    connectedUsers = connectedUsers.filter((user) => user != socket.id);
    console.log(connectedUsers);
    console.log(reason);
  });
});

httpServer.listen(8888, () => {
  console.log('httpserver is listening on port 8888');
});

app.listen(5000, () => {
  console.log('express server is listening on port 5000');
});
