import express from 'express';

import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';

const routes = express.Router();

routes.post('/users', UserController.store);

routes.get('/users', authMiddleware, UserController.index);

export default routes;
