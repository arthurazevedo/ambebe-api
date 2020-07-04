import socketIo from 'socket.io';
import http from 'http';
import app from './app';

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('cliente conectado');
  io.emit('tudobom', 'fala davi');
});

io.on('olamundo', (socket) => {
  console.log(socket);
});

server.listen(process.env.PORT || 3333);
