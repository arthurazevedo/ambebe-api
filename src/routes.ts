import express from 'express';

import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';
import CheckinController from './controllers/CheckinController';
import BarController from './controllers/BarController';

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/bar', BarController.create);

routes.use(authMiddleware);

routes.post('/checkin', CheckinController.create);

export default routes;
