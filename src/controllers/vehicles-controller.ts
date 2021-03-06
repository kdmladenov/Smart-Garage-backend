import express, { Request, Response } from 'express';
import { paging } from '../common/constants.js';
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import validateBody from '../middleware/validate-body.js';
import createVehicleSchema from '../validator/create-vehicle-schema.js';
import errorHandler from '../middleware/errorHandler.js';
import vehiclesService from '../services/vehicles-service.js';
import vehiclesData from '../data/vehicles-data.js';
import errors from '../common/service-errors.js';

const vehiclesController = express.Router();

vehiclesController.use(authMiddleware, loggedUserGuard);

vehiclesController
  .post('/', roleMiddleware(rolesEnum.employee), validateBody('vehicle', createVehicleSchema), errorHandler(async (req: Request, res: Response) => {
    const vehicle = req.body;

    const { result, error } = await vehiclesService.createVehicle(vehiclesData)(vehicle);

    if (error === errors.DUPLICATE_RECORD) {
      res.status(409).send({
        message: 'Vehicle with same vin or license plate is already registered.',
      });
    } else {
      res.status(201).send(result);
    }
  }))

  .put('/:vehicleId', roleMiddleware(rolesEnum.employee), validateBody('vehicle', createVehicleSchema), errorHandler(async (req: Request, res: Response) => {
    const vehicle = req.body;
    const { vehicleId } = req.params;

    const { result, error } = await vehiclesService.updateVehicle(vehiclesData)(vehicle, +vehicleId);

    if (error === errors.RECORD_NOT_FOUND) {
      res.status(404).send({
        message: `Vehicle is not registered.`,
      });
    } else if (error === errors.DUPLICATE_RECORD) {
      res.status(409).send({
        message: `Vehicle with same vin or license plate already exists.`,
      });
    } else {
      res.status(200).send(result);
    }
  }))

  .get('/:vehicleId', errorHandler(async (req: Request, res: Response) => {
    const { vehicleId } = req.params;

    const { result, error } = await vehiclesService.getVehicle(vehiclesData)(+vehicleId);

    if (error === errors.RECORD_NOT_FOUND) {
      res.status(404).send({
        message: `Vehicle with id ${vehicleId} is not found.`,
      });
    } else {
      res.status(200).send(result);
    }
  }))

  .get('/', errorHandler(async (req: Request, res: Response) => {
    let {
      pagesize = paging.vehicles.MIN_PAGE_SIZE,
      page,
      email,
      fullName,
      userId,
      manufacturer,
      modelName,
      carSegment,
    } = req.query;

    if (pagesize < paging.vehicles.MIN_PAGE_SIZE) pagesize = paging.vehicles.MIN_PAGE_SIZE;
    if (pagesize > paging.vehicles.MAX_PAGE_SIZE) pagesize = paging.vehicles.MAX_PAGE_SIZE;
    page = page || '1';
    email = typeof email === 'string' ? email : '';
    userId = typeof userId === 'string' ? userId : '';
    fullName = typeof fullName === 'string' ? fullName : '';
    fullName = fullName && fullName.replace('_', ' ');
    manufacturer = typeof manufacturer === 'string' ? manufacturer : '';
    modelName = typeof modelName === 'string' ? modelName : '';
    carSegment = typeof carSegment === 'string' ? carSegment : '';

    const { result } = await vehiclesService.getAllVehicles(vehiclesData)(
      +page,
      +pagesize,
      email,
      fullName,
      +userId,
      manufacturer,
      modelName,
      carSegment,
    );

    res.status(200).send(result);
  }));

export default vehiclesController;
