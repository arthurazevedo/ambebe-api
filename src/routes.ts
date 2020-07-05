import express from 'express';

import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';
import CheckinController from './controllers/CheckinController';
import BarController from './controllers/BarController';
import OrderController from './controllers/OrderController';
import ProductController from './controllers/ProductController';
import RankController from './controllers/RankController';

const routes = express.Router();

routes.post('/users', UserController.create);

routes.post('/bar', BarController.create);
routes.get('/products', ProductController.index);
routes.get('/rank', RankController.index);

routes.use(authMiddleware);

routes.delete('/bar', BarController.remove);
routes.post('/checkin', CheckinController.create);
routes.get('/users', UserController.index);
routes.post('/orders', OrderController.create);
routes.get('/orders/:id_checkin', OrderController.index);

export default routes;
