import { Request, Response } from 'express';
import knex from '../database';
import io from '../server';

class OrderController {
  static async create(req: Request, res: Response) {
    const { orders } = req.body;

    if (!orders) return res.status(400).json({ error: 'A requisição deve conter um array de pedidos.' });

    try {
      await knex('orders').insert(orders);

      const checkin = await knex('checkins').select('user_id', 'bar_id').where({ id: orders[0].id_checkin }).first();

      io.emit('notification', {
        checkin,
        orders,
      });

      return res.status(200).json({ message: 'Item cadastrado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async index(req: Request, res: Response) {
    const { id_checkin } = req.params;

    try {
      // const orders = await knex('orders').where({ id_checkin });

      const checkin = await knex('checkins')
        .select('user_id', 'bar_id')
        .where({ id: id_checkin })
        .first();

      if (!checkin) return res.status(401).json({ message: 'Não existe o checkin informado.' });

      const orders = await knex('orders').where({ id_checkin });

      if (orders.length <= 0) return res.status(401).json({ message: 'Não existe orders para este checkin.' });

      return res.status(200).json({ checkin, orders });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default OrderController;
