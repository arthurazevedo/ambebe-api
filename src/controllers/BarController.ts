import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import knex from '../database';
import { Bar } from '../types/Bar';

class BarController {
  static async create(req: Request, res: Response) {
    const { name, city, email } = req.body;

    const barExist = await knex('bars').where('email', email).first();

    if (barExist) {
      const token = jwt.sign(barExist.id, process.env.JWT_SECRET);
      return res.status(200).json({
        token,
        barExist,
      });
    }

    if (email === undefined || name === undefined || city === undefined) return res.status(400).json({ error: 'Requisição não está completa, por favor informe o nome e cidade do bar.' });

    try {
      const [bar] = await knex('bars').insert({
        email,
        name,
        city,
      }, ['*']);

      const token = jwt.sign(bar.id, process.env.JWT_SECRET);

      return res.status(201).json({
        token,
        bar,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async remove(req: Request, res: Response) {
    const id = req.body.userId;

    if (!id) return res.status(400).json({ error: 'Informe ID do bar.' });

    try {
      await knex('bars').where({ id }).delete();
      return res.status(200).json({ message: 'Bar deletado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default BarController;
