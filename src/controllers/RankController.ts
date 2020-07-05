import { Request, Response } from 'express';
import knex from '../database';
import { User } from '../types/User';

class RankController {
  static async index(req: Request, res: Response) {
    const { city } = req.query;

    console.log(city);

    try {
      const rank: User[] = await knex('users').where('city', city as String).orderBy('points', 'desc').limit(5);

      return res.status(200).json(rank);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default RankController;
