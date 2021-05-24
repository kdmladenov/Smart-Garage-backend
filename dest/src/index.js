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
import servicesController from "./controllers/services-controller.js";
import partsController from './controllers/parts-controller.js';
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
app.use("/services", servicesController);
app.use("/parts", partsController);
app.use(function (err, req, res, next) {
    res.status(500).send({
        message: err.message,
    });
});
app.listen(PORT, function () { return console.log("Listening on port " + PORT + "..."); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUE0QyxNQUFNLFNBQVMsQ0FBQztBQUNuRSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLGVBQWUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sY0FBYyxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE9BQU8sa0JBQWtCLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLGtCQUFrQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLElBQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBRXRCLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFFL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQWtCLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUMxRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBcUIsSUFBSSxRQUFLLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDIn0=