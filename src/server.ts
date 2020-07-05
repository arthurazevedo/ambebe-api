import socketIo from 'socket.io';
import http from 'http';
import app from './app';
import knex from './database';

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('confirmation', async (data) => {
    const { username, bar_name, products } = data;

    const user = await knex('users').where('username', username).first();

    console.log(data);

    products.forEach((product) => {
      const { points, quantity } = product;

      user.points += (points * quantity);
    });

    await knex('users')
      .where('id', user.id)
      .update('points', user.points);
  });

  socket.on('disconnect', () => {
    console.log('Disconected');
  });
});

server.listen(process.env.PORT || 3333);

export default io;
