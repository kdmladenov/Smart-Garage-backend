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
import db from './pool.js';
var createAddress = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var city, country, postalCode, streetAddress, sql;
    return __generator(this, function (_a) {
        city = address.city, country = address.country, postalCode = address.postalCode, streetAddress = address.streetAddress;
        sql = "\n    INSERT INTO addresses (\n      city,\n      country,\n      postal_code,\n      street_address\n    )\n    VALUES (?, ?, ?, ?)\n  ";
        return [2 /*return*/, db.query(sql, [city, country, postalCode, streetAddress])];
    });
}); };
var create = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var firstName, lastName, companyName, phone, email, password, address, role, addressId, sql, createdUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                firstName = user.firstName, lastName = user.lastName, companyName = user.companyName, phone = user.phone, email = user.email, password = user.password, address = user.address, role = user.role;
                return [4 /*yield*/, createAddress(address)];
            case 1:
                addressId = (_a.sent()).insertId;
                sql = "\n    INSERT INTO users (\n      first_name,\n      last_name,\n      company_name,\n      phone,\n      email, \n      password,\n      address_id,\n      role\n    )\n    VALUES (?, ?, ?)\n  ";
                return [4 /*yield*/, db.query(sql, [
                        firstName,
                        lastName,
                        companyName,
                        phone,
                        email,
                        password,
                        addressId,
                        role,
                    ])];
            case 2:
                createdUser = _a.sent();
                return [2 /*return*/, {
                        id: createdUser.insertId,
                        firstName: firstName,
                        lastName: lastName,
                        companyName: companyName,
                        phone: phone,
                        email: email,
                        addressId: addressId,
                        address: address,
                        role: role,
                    }];
        }
    });
}); };
var getPassword = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT password\n    FROM users\n    WHERE email = ?\n  ";
                return [4 /*yield*/, db.query(sql, [email])];
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
                sql = "\n    SELECT \n      email, \n      password,\n      user_id as userId,\n      role\n    FROM users u\n    WHERE u.is_deleted = 0 AND email = ?\n  ";
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
var getAddress = function (addressId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT \n    city,\n    country,\n    postal_code as postalCode,\n    street_address as streetAddress\n  FROM addresses\n  WHERE address_id = ?\n  ";
                return [4 /*yield*/, db.query(sql, [addressId])];
            case 1:
                result = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getBy = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, user, addressId, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT \n    first_name as firstName,\n    last_name as lastName,\n    company_name as companyName,\n    phone,\n    email, \n    password,\n    address_id as addressId,\n    role\n  FROM users u\n  WHERE u.is_deleted = 0 AND email = ?\n";
                return [4 /*yield*/, db.query(sql, [email])];
            case 1:
                user = (_a.sent())[0];
                addressId = +user.addressId;
                return [4 /*yield*/, getAddress(addressId)];
            case 2:
                address = _a.sent();
                return [2 /*return*/, __assign(__assign({}, user), { address: address })];
        }
    });
}); };
export default {
    create: create,
    getPassword: getPassword,
    remove: remove,
    loginUser: loginUser,
    logoutUser: logoutUser,
    getBy: getBy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3VzZXJzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0IsSUFBTSxhQUFhLEdBQUcsVUFBTyxPQUFnQjs7O1FBQ25DLElBQUksR0FBeUMsT0FBTyxLQUFoRCxFQUFFLE9BQU8sR0FBZ0MsT0FBTyxRQUF2QyxFQUFFLFVBQVUsR0FBb0IsT0FBTyxXQUEzQixFQUFFLGFBQWEsR0FBSyxPQUFPLGNBQVosQ0FBYTtRQUN2RCxHQUFHLEdBQUcsMElBUVgsQ0FBQztRQUVGLHNCQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsRUFBQzs7S0FDbEUsQ0FBQTtBQUVELElBQU0sTUFBTSxHQUFHLFVBQU8sSUFBVTs7Ozs7Z0JBRTVCLFNBQVMsR0FRUCxJQUFJLFVBUkcsRUFDVCxRQUFRLEdBT04sSUFBSSxTQVBFLEVBQ1IsV0FBVyxHQU1ULElBQUksWUFOSyxFQUNYLEtBQUssR0FLSCxJQUFJLE1BTEQsRUFDTCxLQUFLLEdBSUgsSUFBSSxNQUpELEVBQ0wsUUFBUSxHQUdOLElBQUksU0FIRSxFQUNSLE9BQU8sR0FFTCxJQUFJLFFBRkMsRUFDUCxJQUFJLEdBQ0YsSUFBSSxLQURGLENBQ0c7Z0JBRVUscUJBQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztnQkFBekMsU0FBUyxHQUFHLENBQUMsU0FBNEIsQ0FBQyxDQUFDLFFBQVE7Z0JBQ25ELEdBQUcsR0FBRyxtTUFZWCxDQUFDO2dCQUVrQixxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDdEMsU0FBUzt3QkFDVCxRQUFRO3dCQUNS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