import socketIo from 'socket.io';
import http from 'http';
import app from './app';

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(socket);
  socket.on('olamundo', (data) => {
    console.log(data);
  });
});

server.listen(process.env.PORT || 3333);

export default io;
