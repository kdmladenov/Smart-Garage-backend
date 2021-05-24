import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import usersController from './controllers/users-controller.js';
import { PORT } from '../config.js';
import authController from './controllers/auth-controller.js';
import jwtStrategy from './authentication/strategy.js';

const app = express();
passport.use(jwtStrategy);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authController);
app.use('/users', usersController);
app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message,
    });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));
