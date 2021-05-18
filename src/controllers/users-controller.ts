import express, { Request, Response } from 'express';
import usersData from '../data/users-data.js';
import validateBody from '../middleware/validate-body.js';
import usersService from '../services/users-service.js';
import createUserSchema from '../validator/create-user-schema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import errors from '../common/service-errors.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

const usersController = express.Router();

usersController

  // register
  .post('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('user', createUserSchema), errorHandler(async (req: Request, res: Response) => {
    const user = req.body;

    const { error, result } = await usersService.createUser(usersData)(user);

    if (error === errors.DUPLICATE_RECORD) {
      res.status(409).send({
        message: 'User with same email already exists.',
      });
    } else {
      res.status(201).send(result);
    }
  }))

  // Delete user
  .delete('/:userId/delete', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { error, result } = await usersService.deleteUser(usersData)(+userId);

    if (error === errors.RECORD_NOT_FOUND) {
      res.status(404).send({
        message: `User ${userId} is not found.`,
      });
    } else {
      res.status(200).send(result);
    }
  }));

export default usersController;
