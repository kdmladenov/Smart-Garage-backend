import express, { Request, Response } from 'express';
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import errorHandler from '../middleware/errorHandler.js';
import modelsData from '../data/modles-data.js';
import manufacturersService from '../services/models-service.js';

const manufacturerController = express.Router();

manufacturerController
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    errorHandler(async (req: Request, res: Response) => {
      const { result } = await manufacturersService.getAllModels(modelsData)();

      res.status(200).send(result);
    }),
  );

export default manufacturerController;
