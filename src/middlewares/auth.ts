import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.body.userId = payload as Number;

      return next();
    } catch (error) {
      return res.status(400).json({ error: 'Você não está autorizado!' });
    }
  }
  return res.status(400).json({ error: 'Você não está autorizado!' });
};
