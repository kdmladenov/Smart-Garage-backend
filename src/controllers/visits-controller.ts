import express, { Request, Response } from 'express';
// import { paging } from '../common/constants.js';
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import validateBody from '../middleware/validate-body.js';
import createVisitSchema from '../validator/create-visit-schema.js';
import errorHandler from '../middleware/errorHandler.js';
import visitsService from '../services/visits-service.js';
import visitsData from '../data/visits-data.js';
import errors from '../common/service-errors.js';
import servicesData from '../data/services-data.js';
import partsData from '../data/parts-data.js';

const visitsController = express.Router();

visitsController
  .post('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('visit', createVisitSchema), errorHandler(async (req: Request, res: Response) => {
    const visit = req.body;

    const { result } = await visitsService.createVisit(visitsData, servicesData, partsData)(visit);

    return res.status(201).send(result);
  }))

  .get('/:visitId', authMiddleware, loggedUserGuard, errorHandler(async (req: Request, res: Response) => {
    const { visitId } = req.params;

    const { result, error } = await visitsService.getVisit(visitsData)(+visitId);

    if (error === errors.RECORD_NOT_FOUND) {
      return res.status(404).send({
        message: `Visit with id ${visitId} is not found.`,
      });
    }

    return res.status(200).send(result);
  }));

export default visitsController;
