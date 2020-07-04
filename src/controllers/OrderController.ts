import { Request, Response, ErrorRequestHandler } from 'express';
import knex from '../database';

class OrderController {
  static async create(req: Request, res: Response) {
    const { orders } = req.body;

    if (!orders) return res.status(400).json({ error: 'A requisição deve conter um array de pedidos.' });

    try {
      await knex('orders').insert(orders);

      return res.status(200).json({ message: 'Item cadastrado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default OrderController;
