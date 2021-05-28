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
            case 0: return [4 /*yield*/, usersData.getByEmailPhone("email", user.email)];
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
                text = "\n    Dear " + createdUser.firstName + ",\n    Your account at 'Smart Garage' has been created. These are your login credentials:\n      username: " + createdUser.email + "\n      password: " + randomPassword + "\n  ";
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
var getAllUsers = function (usersData) { return function (name, email, phone, model, make, visitRangeLow, visitRangeHigh, sort, order) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getAll(name, email, phone, model, make, visitRangeLow, visitRangeHigh, sort, order)];
            case 1:
                result = _a.sent();
                console.log(result[0], 'tt');
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
                link = "http://localhost:" + forgotPassword.frontEndPort + "/reset-password/" + existingUser.userId + "/" + token;
                subject = 'Password reset link.';
                text = "Dear " + existingUser.firstName + ",\nA request has been received to reset the password of your Smart Garage account. You can do that by clicking on the below link.\n\n  " + link + "\n\nIf you did not initiate the request, just ignore this email - your password will not be changed.";
                mailingService(existingUser.email, subject, text);
                return [2 /*return*/, {
                        error: null,
                        result: { message: "The password reset link has been send to " + email },
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
                text = "Dear " + existingUser.firstName + ",\nYour password has been reset.\nThank you!";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2Vycy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUMvQixPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUdqRCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8scUJBQXFCLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsZ0JBQWdCO0FBQ2hCLElBQU0sVUFBVSxHQUFHLFVBQUMsU0FBb0IsSUFBSyxPQUFBLFVBQU8sSUFBa0I7Ozs7b0JBQzlDLHFCQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQXBFLFlBQVksR0FBRyxDQUFDLFNBQW9ELENBQUM7Z0JBRTNFLElBQUksWUFBWSxFQUFFO29CQUNoQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFHQyxJQUFJLEdBQ0YsSUFBSSxLQURGLEVBQUUsT0FBTyxHQUNYLElBQUksUUFETyxFQUFFLFVBQVUsR0FDdkIsSUFBSSxXQURtQixFQUFFLGFBQWEsR0FDdEMsSUFBSSxjQURrQyxDQUNqQztnQkFFUyxxQkFBTSxTQUFTLENB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