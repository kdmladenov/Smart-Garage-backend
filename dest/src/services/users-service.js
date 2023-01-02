var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import errors from '../common/service-errors.js';
import rolesEnum from '../common/roles.enum.js';
import { PRIVATE_KEY } from '../../config.js';
import { forgotPassword } from '../common/constants.js';
import mailingService from './mailing-service.js';
import randomStringGenerator from '../common/randomStringGenerator.js';
import tokenExists from '../data/tokens-data.js';
// register user
var createUser = function (usersData) { return function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, city, country, postalCode, streetAddress, addressId, randomPassword, password, createdUser, subject, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (user.email !== user.reenteredEmail) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getByEmailPhone("email", user.email)];
            case 1:
                existingUser = (_a.sent());
                if (existingUser) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                city = user.city, country = user.country, postalCode = user.postalCode, streetAddress = user.streetAddress;
                return [4 /*yield*/, usersData.createAddress({
                        city: city,
                        country: country,
                        postalCode: postalCode,
                        streetAddress: streetAddress,
                    })];
            case 2:
                addressId = _a.sent();
                randomPassword = randomStringGenerator(10);
                return [4 /*yield*/, bcrypt.hash(randomPassword, 10)];
            case 3:
                password = _a.sent();
                return [4 /*yield*/, usersData.create(__assign(__assign({}, user), { password: password, addressId: addressId }))];
            case 4:
                createdUser = _a.sent();
                subject = 'Login credentials';
                text = "\n    Dear ".concat(createdUser.firstName, ",\n    Your account at 'Smart Garage' has been created. These are your login credentials:\n      username: ").concat(createdUser.email, "\n      password: ").concat(randomPassword, "\n\n    Click the link below to go to the login page.\n    http://localhost:3000/login\n  ");
                mailingService(createdUser.email, subject, text);
                return [2 /*return*/, {
                        error: null,
                        result: createdUser,
                    }];
        }
    });
}); }; };
// delete user
var deleteUser = function (usersData) { return function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getBy('user_id', userId)];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.remove(userId)];
            case 2:
                _ = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: existingUser,
                    }];
        }
    });
}); }; };
var getUser = function (usersData) { return function (userId, role) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getBy('user_id', userId, role)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [2 /*return*/, {
                        error: null,
                        result: user,
                    }];
        }
    });
}); }; };
// update profile
var update = function (usersData) { return function (userUpdate, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var email, reenteredEmail, existingUser, user, updatedUser, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = userUpdate.email, reenteredEmail = userUpdate.reenteredEmail;
                if (email && email !== reenteredEmail) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getBy('user_id', userId, 'employee')];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                if (!email) return [3 /*break*/, 3];
                return [4 /*yield*/, usersData.getBy('email', email, 'employee')];
            case 2:
                user = _a.sent();
                if (user && user.userId !== userId) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                _a.label = 3;
            case 3:
                updatedUser = __assign(__assign(__assign({}, existingUser), userUpdate), { userId: userId });
                return [4 /*yield*/, usersData.updateData(updatedUser)];
            case 4:
                _ = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: updatedUser,
                    }];
        }
    });
}); }; };
var getAllUsers = function (usersData) { return function (pageSize, page, name, email, phone, modelName, manufacturer, carSegment, visitRangeLow, visitRangeHigh, sort, order) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getAll(+pageSize, +page, name, email, phone, modelName, manufacturer, carSegment, visitRangeLow, visitRangeHigh, sort, order)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); }; };
// change password
var changePassword = function (usersData) { return function (passwordData, userId, role) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, savedPassword, password, reenteredPassword, currentPassword, _a, updated, _;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, usersData.getBy('user_id', userId)];
            case 1:
                existingUser = _b.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getPasswordBy('user_id', userId)];
            case 2:
                savedPassword = (_b.sent()).password;
                password = passwordData.password, reenteredPassword = passwordData.reenteredPassword, currentPassword = passwordData.currentPassword;
                _a = password !== reenteredPassword;
                if (_a) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt.compare(currentPassword, savedPassword)];
            case 3:
                _a = (!(_b.sent()) && role !== rolesEnum.employee);
                _b.label = 4;
            case 4:
                if (_a) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 5:
                updated = _b.sent();
                return [4 /*yield*/, usersData.updatePassword(userId, updated)];
            case 6:
                _ = _b.sent();
                return [2 /*return*/, {
                        error: null,
                        result: { message: 'The password was successfully changed' },
                    }];
        }
    });
}); }; };
// reset password
var forgottenPassword = function (usersData) { return function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, savedPassword, newPrivateKey, payload, token, link, subject, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getBy('email', email)];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getPasswordBy('user_id', existingUser.userId)];
            case 2:
                savedPassword = (_a.sent()).password;
                newPrivateKey = PRIVATE_KEY + savedPassword;
                payload = {
                    email: existingUser.email,
                    id: existingUser.userId,
                };
                token = jwt.sign(payload, newPrivateKey, {
                    expiresIn: forgotPassword.tokenExpiration,
                });
                link = "http://localhost:".concat(forgotPassword.frontEndPort, "/reset-password/").concat(existingUser.userId, "/").concat(token);
                subject = 'Password reset link.';
                text = "Dear ".concat(existingUser.firstName, ",\nA request has been received to reset the password of your Smart Garage account. You can do that by clicking on the below link.\n\n  ").concat(link, "\n\nIf you did not initiate the request, just ignore this email - your password will not be changed.");
                mailingService(existingUser.email, subject, text);
                return [2 /*return*/, {
                        error: null,
                        result: { message: "The password reset link has been send to ".concat(email) },
                    }];
        }
    });
}); }; };
// change password
var resetPassword = function (usersData) { return function (password, reenteredPassword, userId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, savedPassword, newPrivateKey, updated, _, subject, text, blacklistToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tokenExists(token)];
            case 1:
                if (_a.sent()) {
                    return [2 /*return*/, {
                            error: errors.OPERATION_NOT_PERMITTED,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getBy('user_id', userId)];
            case 2:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getPasswordBy('user_id', userId)];
            case 3:
                savedPassword = (_a.sent()).password;
                newPrivateKey = PRIVATE_KEY + savedPassword;
                try {
                    jwt.verify(token, newPrivateKey);
                }
                catch (err) {
                    return [2 /*return*/, {
                            error: errors.OPERATION_NOT_PERMITTED,
                            result: null,
                        }];
                }
                if (password !== reenteredPassword) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 4:
                updated = _a.sent();
                return [4 /*yield*/, usersData.updatePassword(userId, updated)];
            case 5:
                _ = _a.sent();
                subject = 'Your password has been reset.';
                text = "Dear ".concat(existingUser.firstName, ",\nYour password has been reset.\nThank you!");
                mailingService(existingUser.email, subject, text);
                return [4 /*yield*/, usersData.blacklistToken(token)];
            case 6:
                blacklistToken = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: { message: 'The password was successfully reset' },
                    }];
        }
    });
}); }; };
export default {
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser,
    update: update,
    getAllUsers: getAllUsers,
    changePassword: changePassword,
    forgottenPassword: forgottenPassword,
    resetPassword: resetPassword,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2Vycy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUMvQixPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUdqRCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8scUJBQXFCLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsZ0JBQWdCO0FBQ2hCLElBQU0sVUFBVSxHQUFHLFVBQUMsU0FBb0IsSUFBSyxPQUFBLFVBQU8sSUFBa0I7Ozs7O2dCQUNwRSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdEMsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXOzRCQUN6QixNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIO2dCQUVxQixxQkFBTSxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUFwRSxZQUFZLEdBQUcsQ0FBQyxTQUFvRCxDQUFDO2dCQUUzRSxJQUFJLFlBQVksRUFBRTtvQkFDaEIsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLE1BQU0sRUFBRSxJQUFJO3lCQUNiLEVBQUM7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