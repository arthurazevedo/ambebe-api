import dotenv from 'dotenv';
import express, { Response, Request } from 'express';
import routes from './routes';

dotenv.config();
const app = express();

app.use(routes);

app.listen(3333);
