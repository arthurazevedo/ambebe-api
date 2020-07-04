import express from 'express';

import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';
import CheckinController from './controllers/CheckinController';
import BarController from './controllers/BarController';
import OrderController from './controllers/OrderController';

const routes = express.Router();

routes.post('/users', UserController.store);

routes.post('/bar', BarController.create);

routes.use(authMiddleware);

routes.delete('/bar', BarController.remove);
routes.post('/checkin', CheckinController.create);
routes.get('/users', UserController.index);
routes.post('/orders', OrderController.create);

export default routes;
