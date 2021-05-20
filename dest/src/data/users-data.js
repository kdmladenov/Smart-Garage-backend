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
import db from "./pool.js";
import rolesEnum from "../common/roles.enum.js";
var createAddress = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var city, country, postalCode, streetAddress, sql, result, addressId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = address.city, country = address.country, postalCode = address.postalCode, streetAddress = address.streetAddress;
                sql = "\n    INSERT INTO addresses (\n      city,\n      country,\n      postal_code,\n      street_address\n    )\n    VALUES (?, ?, ?, ?)\n  ";
                return [4 /*yield*/, db.query(sql, [
                        city,
                        country,
                        postalCode,
                        streetAddress || null,
                    ])];
            case 1:
                result = _a.sent();
                addressId = result.insertId;
                return [2 /*return*/, addressId];
        }
    });
}); };
var create = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var firstName, lastName, companyName, phone, email, password, addressId, role, sql, createdUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                firstName = user.firstName, lastName = user.lastName, companyName = user.companyName, phone = user.phone, email = user.email, password = user.password, addressId = user.addressId, role = user.role;
                sql = "\n    INSERT INTO users (\n      first_name,\n      last_name,\n      company_name,\n      phone,\n      email, \n      password,\n      addresses_id,\n      role\n    )\n    VALUES (?, ?, ?, ?, ?, ?, ?, ?)\n  ";
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
            case 1:
                createdUser = _a.sent();
                return [2 /*return*/, {
                        id: createdUser.insertId,
                        firstName: firstName,
                        lastName: lastName,
                        companyName: companyName,
                        phone: phone,
                        email: email,
                        addressId: addressId,
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
        sql = "\n    UPDATE users SET\n      is_deleted = 1\n    WHERE user_id = ?\n  ";
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
                sql = "\n  SELECT \n    city,\n    country,\n    postal_code as postalCode,\n    street_address as streetAddress,\n    address_id as addressId\n  FROM addresses\n  WHERE address_id = ?\n  ";
                return [4 /*yield*/, db.query(sql, [addressId])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var getByEmailPhone = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT \n    first_name as firstName,\n    last_name as lastName,\n    phone,\n    email\n  FROM users\n  WHERE is_deleted = 0 AND " + column + " = ?\n";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                user = (_a.sent())[0];
                return [2 /*return*/, user];
        }
    });
}); };
var getBy = function (column, value, isProfileOwner, role) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT \n    first_name as firstName,\n    last_name as lastName,\n    phone,\n    email,\n    a.city,\n    a.country,\n    a.postal_code as postalCode,\n    a.street_address as street\n    " + (role === rolesEnum.employee || isProfileOwner ? ",\n    role" : "") + "\n  FROM users u\n  LEFT JOIN addresses a USING (addresses_id)\n  WHERE is_deleted = 0 AND " + column + " = ?\n";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                user = (_a.sent())[0];
                return [2 /*return*/, user];
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
    createAddress: createAddress,
    getByEmailPhone: getByEmailPhone,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3VzZXJzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNCLE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBRWhELElBQU0sYUFBYSxHQUFHLFVBQU8sT0FBZ0I7Ozs7O2dCQUV6QyxJQUFJLEdBQ0YsT0FBTyxLQURMLEVBQUUsT0FBTyxHQUNYLE9BQU8sUUFESSxFQUFFLFVBQVUsR0FDdkIsT0FBTyxXQURnQixFQUFFLGFBQWEsR0FDdEMsT0FBTyxjQUQrQixDQUM5QjtnQkFFTixHQUFHLEdBQUcsMElBUVgsQ0FBQztnQkFFYSxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDakMsSUFBSTt3QkFDSixPQUFPO3dCQUNQLFVBQVU7d0JBQ1YsYUFBYSxJQUFJLElBQUk7cUJBQ3RCLENBQUMsRUFBQTs7Z0JBTEksTUFBTSxHQUFHLFNBS2I7Z0JBRUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2xDLHNCQUFPLFNBQVMsRUFBQzs7O0tBQ2xCLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBRyxVQUFPLElBQVU7Ozs7O2dCQUU1QixTQUFTLEdBUVAsSUFBSSxVQVJHLEVBQ1QsUUFBUSxHQU9OLElBQUksU0FQRSxFQUNSLFdBQVcsR0FNVCxJQUFJLFlBTkssRUFDWCxLQUFLLEdBS0gsSUFBSSxNQUxELEVBQ0wsS0FBSyxHQUlILElBQUksTUFKRCxFQUNMLFFBQVEsR0FHTixJQUFJLFNBSEUsRUFDUixTQUFTLEdBRVAsSUFBSSxVQUZHLEVBQ1QsSUFBSSxHQUNGLElBQUksS0FERixDQUNHO2dCQUVILEdBQUcsR0FBRyxvTkFZWCxDQUFDO2dCQUVrQixxQkFBTSxFQUFFLENBQUMsS0FBSyxD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