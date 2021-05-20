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
var getUser = function (usersData) { return function (userId, isProfileOwner, role) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersData.getBy("user_id", userId, isProfileOwner, role)];
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
export default {
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2Vycy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBSWpELGdCQUFnQjtBQUNoQixJQUFNLFVBQVUsR0FBRyxVQUFDLFNBQW9CLElBQUssT0FBQSxVQUFPLElBQWtCOzs7Ozs7Z0JBQ3BFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQzVDLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVzs0QkFDekIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFFcUIscUJBQU0sU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBckQsS0FBQSxDQUFDLFNBQW9ELENBQUMsQ0FBQTt3QkFBdEQsd0JBQXNEO2dCQUNyRCxxQkFBTSxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUFyRCxLQUFBLENBQUMsU0FBb0QsQ0FBQyxDQUFBOzs7Z0JBRHJFLFlBQVksS0FDeUQ7Z0JBRTNFLElBQUksWUFBWSxFQUFFO29CQUNoQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFHQyxJQUFJLEdBQ0YsSUFBSSxLQURGLEVBQUUsT0FBTyxHQUNYLElBQUksUUFETyxFQUFFLFVBQVUsR0FDdkIsSUFBSSxXQURtQixFQUFFLGFBQWEsR0FDdEMsSUFBSSxjQURrQyxDQUNqQztnQkFFUyxxQkFBTSxTQUFTLENBQUMsYUFBYSxDQUFDO3dCQUM5QyxJQUFJLE1BQUE7d0JBQ0osT0FBTyxTQUFBO3dCQUNQLFVBQVUsWUFBQTt3QkFDVixhQUFhLGVBQUE7cUJBQ2QsQ0FBQyxFQUFBOztnQkFMSSxTQUFTLEdBQUcsU0FLaEI7Z0JBRWUscUJBQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFBOztnQkFBL0MsUUFBUSxHQUFHLFNBQW9DOztvQkFHbkQsS0FBSyxFQUFFLElBQUk7O2dCQUNILHFCQUFNLFNBQVMsQ0FBQyxNQUFNLHVCQUFNLElBQUksS0FBRSxRQUFRLFVBQUEsRUFBRSxTQUFTLFdBQUEsSUFBRyxFQUFBO29CQUZsRSx1QkFFRSxTQUFNLEdBQUUsU0FBd0Q7eUJBQ2hFOzs7S0FDSCxFQW5DNEMsQ0FtQzVDLENBQUM7QUFFRixjQUFjO0FBQ2QsSUFBTSxVQUFVLEdBQUcsVUFBQyxTQUFvQixJQUFLLE9BQUEsVUFBTyxNQUFjOzs7O29CQUMzQyxxQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBQTs7Z0JBQXZELFlBQVksR0FBRyxTQUF3QztnQkFDN0QsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDakIsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLE1BQU0sRUFBRSxJQUFJO3lCQUNiLEVBQUM7aUJBQ0g7Z0JBRVMscUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQWxDLENBQUMsR0FBRyxTQUE4QjtnQkFFeEMsc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsTUFBTSxFQUFFLFlBQVk7cUJBQ3JCLEVBQUM7OztLQUNILEVBZjRDLENBZTVDLENBQUM7QUFFRixJQUFNLE9BQU8sR0FBRyxVQUFDLFNBQW9CLElBQUssT0FBQSxVQUFPLE1BQWMsRUFBRSxjQUF1QixFQUFFLElBQVk7Ozs7b0JBQ3ZGLHFCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUE7O2dCQUFyRSxJQUFJLEdBQUcsU0FBOEQ7Z0JBQzNFLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1Qsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLE1BQU0sRUFBRSxJQUFJO3lCQUNiLEVBQUM7aUJBQ0g7Z0JBRUQsc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsTUFBTSxFQUFFLElBQUk7cUJBQ2IsRUFBQzs7O0tBQ0gsRUFieUMsQ0FhekMsQ0FBQztBQUVGLGVBQWU7SUFDYixVQUFVLFlBQUE7SUFDVixVQUFVLFlBQUE7SUFDVixPQUFPLFNBQUE7Q0FDUixDQUFDIn0=