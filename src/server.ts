import socketIo from 'socket.io';
import http from 'http';
import app from './app';
import knex from './database';

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('confirmation', async (data) => {
    const { user, products } = data;

    console.log(data);
    const userExist = await knex('users').where('username', user).first();

    products.forEach((product) => {
      const { points, quantity } = product;

      userExist.points += (points * quantity);
    });

    await knex('users')
      .where('id', userExist.id)
      .update('points', userExist.points);
  });

  socket.on('dismiss', async (data) => {
    const { id_checkin } = data.products[0];
    await knex('orders').where('id_checkin', id_checkin).delete();
  });

  socket.on('disconnect', () => {
    console.log('Disconected');
  });
});

server.listen(process.env.PORT || 3333);

export default io;
