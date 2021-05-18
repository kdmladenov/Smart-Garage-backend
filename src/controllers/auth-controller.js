var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import usersData from '../data/users-data.js';
import errors from '../common/service-errors.js';
import usersService from '../services/users-service.js';
import createToken from '../authentication/create-token.js';
import validateBody from '../middleware/validate-body.js';
import loginUserSchema from '../validator/login-user-schema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import errorHandler from '../middleware/errorHandler.js';
const authController = express.Router();
authController
    .post('/login', validateBody('user', loginUserSchema), errorHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error, result } = yield usersService.login(usersData)(email, password);
    if (error === errors.INVALID_LOGIN) {
        res.status(401).send({
            message: 'Invalid email or password.',
        });
    }
    else {
        const payload = {
            userId: result.userId,
            email: result.email,
            role: result.role,
        };
        const token = createToken(payload);
        res.status(200).send({ token });
    }
})))
    .delete('/logout', authMiddleware, errorHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.replace('Bearer ', '');
    const _ = yield usersService.logout(usersData)(token);
    res.status(200).send({
        message: 'You have logged out successfully!',
    });
})));
export default authController;
