import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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

    let user = await knex('users').where('email', email).first();
    if (user) {
      const token = jwt.sign(user.id, process.env.JWT_SECRET);
      return res.status(200).json({
        token,
        user,
      });
    }

    const possibleUser = await knex('users').where({ username }).select('username').first();
    if (possibleUser) return res.status(400).json({ error: `Já existe o username ${possibleUser.username}.` });

    try {
      [user] = await knex('users').insert({
        name, email, username, city, age,
      }, ['*']);

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return res.status(201).json({
        token,
        user,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default UserController;
