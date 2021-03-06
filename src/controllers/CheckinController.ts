import { Request, Response } from 'express';
import knex from '../database';

class CheckinController {
  static async create(req: Request, res: Response) {
    const { user_id, bar_id } = req.body;

    if (!user_id || !bar_id) return res.status(400).json({ error: 'Requisição não está completa, por favor informe o user_id e bar_id' });

    //    if (!(user_id == req.body.userId)) return res.status(401).json({ error: 'User id não corresponde ao token.' });

    try {
      const [id_checkin] = await knex('checkins').insert({
        user_id,
        bar_id,
      }, ['id']);

      return res.status(201).json({
        message: 'Checkin realizado com sucesso!',
        id_checkin: id_checkin.id,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde.' });
    }
  }
}
export default CheckinController;
