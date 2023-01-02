import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import usersController from './controllers/users-controller.js';
import { PORT } from '../config.js';
import authController from './controllers/auth-controller.js';
import jwtStrategy from './authentication/strategy.js';
import vehiclesController from './controllers/vehicles-controller.js';
import visitsController from './controllers/visits-controller.js';
import servicesController from './controllers/services-controller.js';
import partsController from './controllers/parts-controller.js';
import invoicesController from './controllers/invoices-controller.js';
import modelsController from './controllers/models-controller.js';
var app = express();
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
app.use(function (err, req, res, next) {
    res.status(500).send({
        message: err.message,
    });
});
app.listen(PORT, function () { return console.log("Listening on port ".concat(PORT, "...")); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUE0QyxNQUFNLFNBQVMsQ0FBQztBQUNuRSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLGVBQWUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sY0FBYyxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE9BQU8sa0JBQWtCLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLGtCQUFrQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sa0JBQWtCLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxJQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUV0QixRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBRS9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ2pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUVyQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBa0IsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQzFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztLQUNyQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUFxQixJQUFJLFFBQUssQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLENBQUMifQ==