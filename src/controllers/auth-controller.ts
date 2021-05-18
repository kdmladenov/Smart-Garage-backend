import express, { Request, Response } from 'express';
import usersData from '../data/users-data.js';
import errors from '../common/service-errors.js';
import authService from '../services/auth-service.js';
import createToken from '../authentication/create-token.js';
import validateBody from '../middleware/validate-body.js';
import loginUserSchema from '../validator/login-user-schema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import errorHandler from '../middleware/errorHandler.js';
import UsersData from '../models/UsersData';

const authController = express.Router();

authController
  .post('/login', validateBody('user', loginUserSchema), errorHandler(async (req: Request, res: Response) => {
    const { email, password }: {email: string, password: string}= req.body;
    const { error, result } = await authService.login(usersData)(email, password);

    if (error === errors.INVALID_LOGIN) {
      res.status(401).send({
        message: 'Invalid email or password.',
      });
    } else {
      const payload = {
        userId: result.userId,
        email: result.email,
        role: result.role,
      };
      const token = createToken(payload);

      res.status(200).send({ token });
    }
  }))

  .delete('/logout', authMiddleware, errorHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization!.replace('Bearer ', ''); // if there is no token we will never get to this line. Token wil never be undefined

    
    const _ = await authService.logout(usersData)(token);

    res.status(200).send({
      message: 'You have logged out successfully!',
    });
  }));

export default authController;
