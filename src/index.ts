import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import usersController from './controllers/users-controller.js';
import { PORT } from '../config.js';
import authController from './controllers/auth-controller.js';
import jwtStrategy from './authentication/strategy.js';
import HttpException from './models/HttpException';
import vehiclesController from './controllers/vehicles-controller.js';
import visitsController from './controllers/visits-controller.js';
import servicesController from './controllers/services-controller.js';
import partsController from './controllers/parts-controller.js';
import invoicesController from './controllers/invoices-controller.js';
import modelsController from './controllers/models-controller.js';

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authController);
app.use('/users', usersController);
app.use('/vehicles', vehiclesController);
app.use('/visits', visitsController);
app.use('/services', servicesController);
app.use('/parts', partsController);
app.use('/invoices', invoicesController);
app.use('/models', modelsController);

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
