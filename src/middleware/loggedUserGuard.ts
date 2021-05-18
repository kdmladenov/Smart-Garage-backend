import { NextFunction, Request, Response } from 'express';
import tokenExists from '../data/tokens-data.js';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!.replace('Bearer ', '');

  if (await tokenExists(token)) {
    return res.status(401).send({
      message: ' You are not logged in!',
    });
  }

  await next();
};
