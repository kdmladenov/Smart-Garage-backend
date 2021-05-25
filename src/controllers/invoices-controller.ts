import express, { Request, Response } from 'express';
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import errorHandler from '../middleware/errorHandler.js';
import invoicesService from '../services/invoices-services.js';
import visitsData from '../data/visits-data.js';
import errors from '../common/service-errors.js';
import invoicesData from '../data/invoices-data.js';
import usersData from '../data/users-data.js';
import { sqlRegex } from '../common/constants.js';

const invoicesController = express.Router();

invoicesController
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId: loggedUserId, role } = req.user!;
      const { visitId, userId } = req.query;
      let { dateRangeLow, dateRangeHigh } = req.query;

      dateRangeLow = (typeof dateRangeLow === 'string' && sqlRegex.test(dateRangeLow)) ? dateRangeLow : '';
      dateRangeHigh = (typeof dateRangeHigh === 'string' && sqlRegex.test(dateRangeHigh)) ? dateRangeHigh : '';
      const validatedUserId = userId ? +userId : 0;
      const validatedVisitId = visitId ? +visitId : 0;

      const { result, error } = await invoicesService.getAllInvoices(invoicesData, usersData, visitsData)(
        validatedUserId,
        validatedVisitId,
        dateRangeLow,
        dateRangeHigh,
        +loggedUserId,
        role,
      );

      if (error === errors.RECORD_NOT_FOUND) {
        return res.status(404).send({
          message: `Visit with id ${visitId} was not found.`,
        });
      }

      if (error === errors.OPERATION_NOT_PERMITTED) {
        return res.status(403).send({
          message: `This resource is forbidden!`,
        });
      }

      return res.status(200).send(result);
    }),
  )

  .get(
    '/:invoiceId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { invoiceId } = req.params;
      const { userId: loggedUserId, role } = req.user!;

      const { error, result } = await invoicesService.getById(invoicesData)(+invoiceId, +loggedUserId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        return {
          message: `User or Visit were not found.`,
        };
      }
      if (error === errors.OPERATION_NOT_PERMITTED) {
        return {
          message: `This resource is forbidden.`,
        };
      }

      res.status(200).send(result);
    }),
  )

  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    errorHandler(async (req: Request, res: Response) => {
      const { visitId } = req.body;

      const { error, result } = await invoicesService.createInvoice(invoicesData)(visitId);

      if (error === errors.DUPLICATE_RECORD) {
        res.status(400).send({
          message: 'Invoice for this visit already exists.',
        });
      }

      res.status(201).send(result);
    }),
  );
export default invoicesController;
