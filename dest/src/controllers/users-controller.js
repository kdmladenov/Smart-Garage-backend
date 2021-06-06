var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable complexity */
import express from 'express';
import { paging } from '../common/constants.js';
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
import updateUserSchema from '../validator/update-user-schema.js';
import updatePasswordSchema from '../validator/update-password-schema.js';
import forgottenPasswordSchema from '../validator/forgotten-password-schema.js';
import resetPasswordSchema from '../validator/reset-password-schema.js';
var usersController = express.Router();
usersController
    // register
    .post('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('user', createUserSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.body;
                return [4 /*yield*/, usersService.createUser(usersData)(user)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: 'The request was invalid. Passwords do not match.',
                    });
                }
                if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: 'User with same email already exists.',
                    });
                }
                else {
                    res.status(201).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Delete user
    .delete('/:userId', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, usersService.deleteUser(usersData)(+userId)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + userId + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Get All users
    .get('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, pageSize, _c, page, _d, name, _e, email, _f, phone, _g, modelName, _h, manufacturer, _j, visitRangeLow, _k, visitRangeHigh, _l, sort, _m, order, result;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0:
                _a = req.query, _b = _a.pageSize, pageSize = _b === void 0 ? paging.users.MIN_PAGE_SIZE : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.name, name = _d === void 0 ? '' : _d, _e = _a.email, email = _e === void 0 ? '' : _e, _f = _a.phone, phone = _f === void 0 ? '' : _f, _g = _a.modelName, modelName = _g === void 0 ? '' : _g, _h = _a.manufacturer, manufacturer = _h === void 0 ? '' : _h, _j = _a.visitRangeLow, visitRangeLow = _j === void 0 ? '' : _j, _k = _a.visitRangeHigh, visitRangeHigh = _k === void 0 ? '' : _k, _l = _a.sort, sort = _l === void 0 ? 'name' : _l, _m = _a.order, order = _m === void 0 ? 'ASC' : _m;
                if (pageSize < paging.users.MIN_PAGE_SIZE)
                    pageSize = paging.users.MIN_PAGE_SIZE;
                if (pageSize > paging.users.MAX_PAGE_SIZE)
                    pageSize = paging.users.MAX_PAGE_SIZE;
                page = page || 1;
                email = typeof email === 'string' ? email : '';
                name = typeof name === 'string' ? name : '';
                phone = typeof phone === 'string' ? phone : '';
                modelName = typeof modelName === 'string' ? modelName : '';
                manufacturer = typeof manufacturer === 'string' ? manufacturer : '';
                visitRangeLow = typeof visitRangeLow === 'string' ? visitRangeLow : '';
                visitRangeHigh = typeof visitRangeHigh === 'string' ? visitRangeHigh : '';
                sort = typeof sort === 'string' ? sort : '';
                order = typeof order === 'string' ? order : '';
                return [4 /*yield*/, usersService.getAllUsers(usersData)(+pageSize, +page, name, email, phone, modelName, manufacturer, visitRangeLow, visitRangeHigh, sort, order)];
            case 1:
                result = _o.sent();
                res.status(200).send(result);
                return [2 /*return*/];
        }
    });
}); }))
    // )
    // Get a single user
    .get('/:userId', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, role, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                role = req.user.role;
                return [4 /*yield*/, usersService.getUser(usersData)(+userId, role)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + userId + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Update a single user
    .put('/:userId', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('user', updateUserSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, update, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.userId;
                update = req.body;
                return [4 /*yield*/, usersService.update(usersData)(update, +id)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: 'The request was invalid. Emails are required or do not match.',
                    });
                }
                else if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + id + " is not found.",
                    });
                }
                else if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: 'User with same email already exists.',
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Change password
    .patch('/:userId/change-password', authMiddleware, loggedUserGuard, validateBody('user', updatePasswordSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role, id, passwordData, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                role = req.user.role;
                id = role === rolesEnum.employee ? req.params.userId : req.user.userId;
                passwordData = req.body;
                return [4 /*yield*/, usersService.changePassword(usersData)(passwordData, +id, role)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: 'The request was invalid. Passwords do not match.',
                    });
                }
                else if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + id + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Forgotten password with mail password reset
    .post('/forgotten-password', validateBody('user', forgottenPasswordSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                console.log(email);
                return [4 /*yield*/, usersService.forgottenPassword(usersData)(email)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "A user with email " + email + " is not found",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Reset password
    .post('/reset-password/:userId/:token', validateBody('user', resetPasswordSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, reenteredPassword, _b, userId, token, _c, error, result;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, password = _a.password, reenteredPassword = _a.reenteredPassword;
                _b = req.params, userId = _b.userId, token = _b.token;
                return [4 /*yield*/, usersService.resetPassword(usersData)(password, reenteredPassword, +userId, token)];
            case 1:
                _c = _d.sent(), error = _c.error, result = _c.result;
                if (error === errors.OPERATION_NOT_PERMITTED) {
                    res.status(403).send({
                        message: 'The link already has been used or expired.',
                    });
                }
                else if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: 'Passwords do not match.',
                    });
                }
                else if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + userId + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }));
export default usersController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2Vycy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLFNBQVMsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLGdCQUFnQixNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sY0FBYyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sY0FBYyxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sZ0JBQWdCLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxvQkFBb0IsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLHVCQUF1QixNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sbUJBQW1CLE1BQU0sdUNBQXVDLENBQUM7QUFFeEUsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXpDLGVBQWU7SUFFYixXQUFXO0tBQ1YsSUFBSSxDQUNILEdBQUcsRUFDSCxjQUFjLEVBQ2QsZUFBZSxFQUNmLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQ2xDLFlBQVksQ0FBQyxNQUFNLEVB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