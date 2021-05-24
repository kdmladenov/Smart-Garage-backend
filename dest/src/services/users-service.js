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
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import errors from '../common/service-errors.js';
import rolesEnum from '../common/roles.enum.js';
import { DB_CONFIG, PRIVATE_KEY } from "../../config.js";
import { forgotPassword } from '../common/constants.js';
// register user
var createUser = function (usersData) { return function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, _a, city, country, postalCode, streetAddress, addressId, password;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (user.password !== user.reenteredPassword) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getByEmailPhone("email", user.email)];
            case 1:
                _a = (_c.sent());
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, usersData.getByEmailPhone("phone", user.phone)];
            case 2:
                _a = (_c.sent());
                _c.label = 3;
            case 3:
                existingUser = _a;
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
            case 4:
                addressId = _c.sent();
                return [4 /*yield*/, bcrypt.hash(user.password, 10)];
            case 5:
                password = _c.sent();
                _b = {
                    error: null
                };
                return [4 /*yield*/, usersData.create(__assign(__assign({}, user), { password: password, addressId: addressId }))];
            case 6: return [2 /*return*/, (_b.result = _c.sent(),
                    _b)];
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
            case 0: return [4 /*yield*/, usersData.getBy("user_id", userId, role)];
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
                return [4 /*yield*/, usersData.getBy("user_id", userId, "employee")];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                if (!email) return [3 /*break*/, 3];
                return [4 /*yield*/, usersData.getBy("email", email, "employee")];
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
                console.log(result[0], "tt");
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
// change password
var forgottenPassword = function (usersData) { return function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, savedPassword, newPrivateKey, payload, token, link, transporter, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getBy("email", email)];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getPasswordBy("user_id", existingUser.userId)];
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
                link = "http://" + DB_CONFIG.host + ":" + forgotPassword.frontEndPort + "/reset-password/" + existingUser.userId + "/" + token;
                transporter = nodemailer.createTransport({
                    service: forgotPassword.emailService,
                    auth: {
                        user: forgotPassword.emailUser,
                        pass: forgotPassword.emailPassword,
                    },
                });
                options = {
                    from: forgotPassword.emailUser,
                    to: "" + existingUser.email,
                    subject: "Password reset link.",
                    text: "Dear " + existingUser.email + ",\nA request has been received to reset the password of your Smart Garage account. You can do that by clicking on the below link.\n\n" + link + "\nIf you did not initiate the request, just ignore this email - your password will not be changed.",
                };
                transporter.sendMail(options, function (err, info) {
                    if (err) {
                        return;
                    }
                    console.log("Sent: + " + info.response);
                });
                return [2 /*return*/, {
                        error: null,
                        result: { message: "The password reset link has been send to " + email },
                    }];
        }
    });
}); }; };
// change password
var resetPassword = function (usersData) { return function (password, reenteredPassword, userId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, savedPassword, newPrivateKey, payload, updated, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getBy("user_id", userId)];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getPasswordBy("user_id", userId)];
            case 2:
                savedPassword = (_a.sent()).password;
                newPrivateKey = PRIVATE_KEY + savedPassword;
                payload = jwt.verify(token, newPrivateKey);
                if (password !== reenteredPassword || !payload) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 3:
                updated = _a.sent();
                return [4 /*yield*/, usersData.updatePassword(userId, updated)];
            case 4:
                _ = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: { message: "The password was successfully reset" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2Vycy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUMvQixPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFHakQsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsZ0JBQWdCO0FBQ2hCLElBQU0sVUFBVSxHQUFHLFVBQUMsU0FBb0IsSUFBSyxPQUFBLFVBQU8sSUFBa0I7Ozs7OztnQkFDcEUsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtvQkFDNUMsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXOzRCQUN6QixNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIO2dCQUVxQixxQkFBTSxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUFyRCxLQUFBLENBQUMsU0FBb0QsQ0FBQyxDQUFBO3dCQUF0RCx3QkFBc0Q7Z0JBQ3JELHFCQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQXJELEtBQUEsQ0FBQyxTQUFvRCxDQUFDLENBQUE7OztnQkFEckUsWUFBWSxLQUN5RDtnQkFFM0UsSUFBSSxZQUFZLEVBQUU7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
