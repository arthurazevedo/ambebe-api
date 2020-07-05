import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import knex from '../database';

import { User } from '../types/User';

class UserController {
  static async index(req: Request, res: Response) {
    const { username } = req.body;

    if (username) {
      try {
        const user: User = await knex('users').where('username', username).first();

        if (user) {
          return res.status(200).json(user);
        }
        return res.status(404).json({ error: `${username} não encontrado.` });
      } catch (error) {
        return res.status(500).json({ error: `Não foi possível procurar por ${username}.` });
      }
    }

    try {
      const users: User[] = await knex('users');
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao listar os usuários.' });
    }
  }

  static async create(req: Request, res: Response) {
    const {
      name, email, username, city, age,
    } = req.body;

    let user: User = await knex('users').where('email', email).first();
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
      return res.status(500).json({ error: 'Não foi possível criar o usuário.' });
    }
  }
}

export default UserController;
