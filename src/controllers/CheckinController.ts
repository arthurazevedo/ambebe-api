import { Request, Response } from 'express';
import knex from '../database';

class CheckinController {
  async create(req: Request, res: Response) {
    const { user_id, bar_id } = req.body;

    if (user_id === undefined || bar_id === undefined) return res.status(400).json({ error: 'Requisição não está completa, por favor informe o user_id e bar_id' });

    try {
      knex('checkins').insert({
        user_id,
        bar_id,
      });

      return res.status(200).json({ message: 'Checkin realizado com sucesso!' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde.' });
    }
  }
}
export default CheckinController;
