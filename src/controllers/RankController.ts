import { Request, Response } from 'express';
import knex from '../database';

class RankController {
  static async index(req: Request, res: Response) {
    const { city } = req.body;

    try {
      const rank = await knex('users').where('city', city).orderBy('points', 'desc').limit(5);

      return res.status(200).json(rank);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default RankController;
