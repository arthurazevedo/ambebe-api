import { Request, Response } from 'express';
import knex from '../database';

class OrderController {
  static async create(req: Request, res: Response) {
    const { orders } = req.body;

    if (!orders) return res.status(400).json({ error: 'Informe os valores necessários (id_checkin, id_product, quantity)' });

    try {
      await knex('orders').insert(orders);

      return res.status(200).json({ message: 'Item cadastrado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
export default OrderController;
