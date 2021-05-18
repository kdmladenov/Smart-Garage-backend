import { NextFunction, Request, Response } from 'express';
import errorStrings from '../common/error-strings.js';

export default (resource: string, scheme) => async (req: Request, res: Response, next: NextFunction) => {
  const errors = {};
  Object.keys(scheme).forEach(key => {
    if (!scheme[key](req.body[key])) {
      errors[key] = errorStrings[resource][key];
    }
  });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  await next();
};
