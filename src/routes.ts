import express from 'express';

import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';
import CheckinController from './controllers/CheckinController';
import BarController from './controllers/BarController';
import OrderController from './controllers/OrderController';

import io from './server';

const routes = express.Router();

routes.post('/users', UserController.create);

routes.post('/bar', BarController.create);

routes.get('/', (req, res) => {
  io.emit('tudobom', 'fala davi');
});

routes.use(authMiddleware);

routes.delete('/bar', BarController.remove);
routes.post('/checkin', CheckinController.create);
routes.get('/users', UserController.index);
routes.post('/orders', OrderController.create);
routes.get('/orders/:id_checkin', OrderController.index);

export default routes;
