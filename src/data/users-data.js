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
import db from './pool.js';
// need to add more fields (first name, last name ...)
var create = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, createdUser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    INSERT INTO users (\n      email, \n      password,\n      role_id\n    )\n    VALUES (?, ?, (SELECT role_id FROM roles WHERE type = ?))\n  ";
                return [4 /*yield*/, db.query(sql, [
                        user.email,
                        user.password,
                        user.role,
                    ])];
            case 1:
                createdUser = _a.sent();
                result = {
                    id: createdUser.insertId,
                    email: user.email,
                    role: user.role,
                };
                return [2 /*return*/, result];
        }
    });
}); };
var getPassword = function (value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT password\n    FROM users\n    WHERE email = ?\n  ";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var remove = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    UPDATE users SET\n      is_deleted = 1,\n    WHERE user_id = ?\n  ";
        return [2 /*return*/, db.query(sql, [userId])];
    });
}); };
var loginUser = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT \n      u.email as email, \n      u.password as password,\n      u.user_id as userId,\n      r.type as role\n    FROM users u\n    LEFT JOIN roles r USING (role_id)\n    WHERE u.is_deleted = 0 AND email = ?\n  ";
                return [4 /*yield*/, db.query(sql, [email])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
// tokens table includes blacklisted tokens only
var logoutUser = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    INSERT INTO tokens (\n      token\n    )\n    VALUES( ? )\n  ";
        return [2 /*return*/, db.query(sql, [token])];
    });
}); };
export default {
    create: create,
    getPassword: getPassword,
    remove: remove,
    loginUser: loginUser,
    logoutUser: logoutUser,
};
