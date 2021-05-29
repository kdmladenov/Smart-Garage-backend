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
    var _a, _b, pageSize, _c, page, _d, name, _e, email, _f, phone, _g, model, _h, make, _j, visitRangeLow, _k, visitRangeHigh, _l, sort, _m, order, result;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0:
                _a = req.query, _b = _a.pageSize, pageSize = _b === void 0 ? paging.users.MIN_PAGE_SIZE : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.name, name = _d === void 0 ? '' : _d, _e = _a.email, email = _e === void 0 ? '' : _e, _f = _a.phone, phone = _f === void 0 ? '' : _f, _g = _a.model, model = _g === void 0 ? '' : _g, _h = _a.make, make = _h === void 0 ? '' : _h, _j = _a.visitRangeLow, visitRangeLow = _j === void 0 ? '' : _j, _k = _a.visitRangeHigh, visitRangeHigh = _k === void 0 ? '' : _k, _l = _a.sort, sort = _l === void 0 ? 'name' : _l, _m = _a.order, order = _m === void 0 ? 'ASC' : _m;
                if (pageSize < paging.users.MIN_PAGE_SIZE)
                    pageSize = paging.users.MIN_PAGE_SIZE;
                if (pageSize > paging.users.MAX_PAGE_SIZE)
                    pageSize = paging.users.MAX_PAGE_SIZE;
                page = page || 1;
                email = typeof email === 'string' ? email : '';
                name = typeof name === 'string' ? name : '';
                phone = typeof phone === 'string' ? phone : '';
                model = typeof model === 'string' ? model : '';
                make = typeof make === 'string' ? make : '';
                visitRangeLow = typeof visitRangeLow === 'string' ? visitRangeLow : '';
                visitRangeHigh = typeof visitRangeHigh === 'string' ? visitRangeHigh : '';
                sort = typeof sort === 'string' ? sort : '';
                order = typeof order === 'string' ? order : '';
                return [4 /*yield*/, usersService.getAllUsers(usersData)(+pageSize, +page, name, email, phone, model, make, visitRangeLow, visitRangeHigh, sort, order)];
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