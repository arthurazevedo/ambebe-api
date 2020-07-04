import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import knex from '../database';

class BarController {
  static async create(req: Request, res: Response) {
    const { name, city, email } = req.body;

    if (email === undefined || name === undefined || city === undefined) return res.status(400).json({ error: 'Requisição não está completa, por favor informe o nome e cidade do bar.' });

    try {
      let bar = await knex('bars').where('email', email).first();

      if (bar) {
        const token = jwt.sign(bar.id, process.env.JWT_SECRET);
        return res.status(200).json({
          token,
          bar,
        });
      }

      [bar] = await knex('bars').insert({
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
}
export default BarController;
