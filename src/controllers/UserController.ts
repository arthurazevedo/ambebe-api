import { Request, Response } from 'express';
import knex from '../database';

class UserController {
  static async index(req: Request, res: Response) {
    const users = await knex('users');

    return res.json(users);
  }

  static async store(req: Request, res: Response) {
    const {
      name, email, username, city, age,
    } = req.body;

    let [user] = await knex('users').where('email', email);
    if (user) { return res.status(200).json(user); }

    const [{ username: possibleUsername }] = await knex('users').where({ username }).select('username');
    if (possibleUsername) return res.status(400).json({ error: `Já existe o username ${possibleUsername}.` });

    try {
      [user] = await knex('users').insert({
        name, email, username, city, age,
      }, ['*']);

      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Não foi possível criar o usuário.' });
    }
  }
}

export default UserController;
