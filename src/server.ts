import socketIo from 'socket.io';
import http from 'http';
import app from './app';
import knex from './database';

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('confirmation', async (data) => {
    const { username, bar_name, orders } = data;

    const user = await knex('users').where('username', username).first();

    console.log(data);

    const points = 0;

    orders.forEach((order) => {
      console.log(order.quantity);
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconected');
  });
});

server.listen(process.env.PORT || 3333);

export default io;
