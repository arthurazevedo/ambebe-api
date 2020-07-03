import { Request, Response } from 'express';
import knex from '@database/index';

class UserController {
  static async index(req: Request, res: Response) {
    const users = await knex('users');

    return res.json(users);
  }

  static async store(req: Request, res: Response) {

  }
}

export default UserController;
