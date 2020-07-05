import socketIo from 'socket.io';
import http from 'http';
import app from './app';
import knex from './database';

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('confirmation', async (data) => {
    const { user_id } = data.checkin;
    const { orders } = data;

    const user = await knex('users').where({ id: user_id }).first();

    console.log(user);

    const points = 0;

    orders.forEach((order) => {
      console.log(order.quantity);
    });
  });
});

server.listen(process.env.PORT || 3333);

export default io;
