import express from 'express';

import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

export default routes;
