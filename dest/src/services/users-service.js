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
import errors from '../common/service-errors.js';
import rolesEnum from '../common/roles.enum.js';
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
export default {
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser,
    update: update,
    getAllUsers: getAllUsers,
    changePassword: changePassword,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2Vycy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBR2pELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBRWhELGdCQUFnQjtBQUNoQixJQUFNLFVBQVUsR0FBRyxVQUFDLFNBQW9CLElBQUssT0FBQSxVQUFPLElBQWtCOzs7Ozs7Z0JBQ3BFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQzVDLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVzs0QkFDekIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFFcUIscUJBQU0sU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBckQsS0FBQSxDQUFDLFNBQW9ELENBQUMsQ0FBQTt3QkFBdEQsd0JBQXNEO2dCQUNyRCxxQkFBTSxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUFyRCxLQUFBLENBQUMsU0FBb0QsQ0FBQyxDQUFBOzs7Z0JBRHJFLFlBQVksS0FDeUQ7Z0JBRTNFLElBQUksWUFBWSxFQUFFO29CQUNoQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFHQyxJQUFJLEdBQ0YsSUFBSSxLQURGLEVBQUUsT0FBTyxHQUNYLElBQUksUUFETyxFQUFFLFVBQVUsR0FDdkIsSUFBSSxX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