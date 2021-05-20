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
    var existingUser, password;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (user.password !== user.reenteredPassword) {
                    return [2 /*return*/, {
                            error: errors.BAD_REQUEST,
                            result: null,
                        }];
                }
                return [4 /*yield*/, usersData.getBy(user.email)];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                return [4 /*yield*/, bcrypt.hash(user.password, 10)];
            case 2:
                password = _b.sent();
                _a = {
                    error: null
                };
                return [4 /*yield*/, usersData.create(__assign(__assign({}, user), { password: password }))];
            case 3: return [2 /*return*/, (_a.result = _b.sent(),
                    _a)];
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
export default {
    createUser: createUser,
    deleteUser: deleteUser,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2Vycy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBR2pELGdCQUFnQjtBQUNoQixJQUFNLFVBQVUsR0FBRyxVQUFDLFNBQW9CLElBQUssT0FBQSxVQUFPLElBQW9FOzs7Ozs7Z0JBQ3RILElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQzVDLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVzs0QkFDekIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFFb0IscUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUFoRCxZQUFZLEdBQUcsU0FBaUM7Z0JBRXRELElBQUksWUFBWSxFQUFFO29CQUNoQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFFZ0IscUJBQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFBOztnQkFBL0MsUUFBUSxHQUFHLFNBQW9DOztvQkFHbkQsS0FBSyxFQUFFLElBQUk7O2dCQUNILHFCQUFNLFNBQVMsQ0FBQyxNQUFNLHVCQUFNLElBQUksS0FBRSxRQUFRLFVBQUEsSUFBRyxFQUFBO29CQUZ2RCx1QkFFRSxTQUFNLEdBQUUsU0FBNkM7eUJBQ3JEOzs7S0FDSCxFQXZCNEMsQ0F1QjVDLENBQUM7QUFFRixjQUFjO0FBQ2QsSUFBTSxVQUFVLEdBQUcsVUFBQyxTQUFvQixJQUFLLE9BQUEsVUFBTyxNQUFjOzs7O29CQUMzQyxxQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBQTs7Z0JBQXZELFlBQVksR0FBRyxTQUF3QztnQkFDN0QsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDakIsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLE1BQU0sRUFBRSxJQUFJO3lCQUNiLEVBQUM7aUJBQ0g7Z0JBRVMscUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQWxDLENBQUMsR0FBRyxTQUE4QjtnQkFFeEMsc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsTUFBTSxFQUFFLFlBQVk7cUJBQ3JCLEVBQUM7OztLQUNILEVBZjRDLENBZTVDLENBQUM7QUFFRixlQUFlO0lBQ2IsVUFBVSxZQUFBO0lBQ1YsVUFBVSxZQUFBO0NBQ1gsQ0FBQyJ9