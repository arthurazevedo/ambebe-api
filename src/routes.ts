import express, { Request, Response } from 'express';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.send('hello world'));

export default routes;
