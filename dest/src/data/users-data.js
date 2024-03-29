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
                sql = "\n    INSERT INTO users (\n      first_name,\n      last_name,\n      company_name,\n      phone,\n      email, \n      password,\n      address_id,\n      role\n    )\n    VALUES (?, ?, ?, ?, ?, ?, ?, ?)\n  ";
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
var blacklistToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
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
                sql = "\n  SELECT \n    first_name as firstName,\n    last_name as lastName,\n    phone,\n    email\n  FROM users\n  WHERE is_deleted = 0 AND ".concat(column, " = ?\n");
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                user = (_a.sent())[0];
                return [2 /*return*/, user];
        }
    });
}); };
var getBy = function (column, value, role) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT \n    first_name as firstName,\n    last_name as lastName,\n    user_id as userId,\n    phone,\n    email,\n    address_id as addressId,\n    a.city,\n    a.country,\n    a.postal_code as postalCode,\n    a.street_address as street\n    ".concat(role === rolesEnum.employee ? ",\n    role" : "", "\n  FROM users u\n  LEFT JOIN addresses a USING (address_id)\n  WHERE is_deleted = 0 AND ").concat(column, " = ?\n");
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                user = (_a.sent())[0];
                return [2 /*return*/, user];
        }
    });
}); };
var updateData = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, updated, sql2, updatedAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    UPDATE users SET\n      first_name = ?, \n      last_name = ?, \n      company_name = ?, \n      phone = ?,\n      email = ?,\n      role = ?\n    WHERE user_id = ?\n  ";
                return [4 /*yield*/, db.query(sql, [
                        user.firstName || null,
                        user.lastName || null,
                        user.companyName || null,
                        user.phone || null,
                        user.email || null,
                        user.role || null,
                        user.userId,
                    ])];
            case 1:
                updated = _a.sent();
                sql2 = "\n    UPDATE addresses SET\n      city = ?, \n      country = ?, \n      postal_code = ?, \n      street_address = ?\n    WHERE address_id = ?\n  ";
                return [4 /*yield*/, db.query(sql2, [
                        user.city || null,
                        user.country || null,
                        user.postalCode || null,
                        user.streetAddress || null,
                        user.addressId,
                    ])];
            case 2:
                updatedAddress = _a.sent();
                return [2 /*return*/, __assign(__assign({}, updated), updatedAddress)];
        }
    });
}); };
var updateAddress = function (address) { return __awaiter(void 0, void 0, void 0, function () {
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
var getAll = function (pageSize, page, name, email, phone, modelName, manufacturer, carSegment, visitRangeLow, visitRangeHigh, sort, order) { return __awaiter(void 0, void 0, void 0, function () {
    var direction, sortedColumn, offset, sql;
    return __generator(this, function (_a) {
        direction = ['ASC', 'asc', 'DESC', 'desc'].includes(order) ? order : 'asc';
        sortedColumn = ['fullName', 'visitStart'].includes(sort) ? sort : 'fullName';
        offset = page ? (page - 1) * pageSize : 0;
        sql = "\n    SELECT \n      COUNT(*) OVER () AS totalDBItems,\n      uvv.is_deleted,\n      uvv.user_id as userId,\n      au.fullName,\n      uvv.firstName,\n      uvv.lastName,\n      uvv.companyName,\n      uvv.phone,\n      uvv.email,    \n      a.city,\n      a.country,    \n      a.postal_code as postalCode,\n      a.street_address as streetAddress, \n      uvv.vehicle_id as vehicleId,\n      uvv.vin,\n      uvv.licensePlate,       \n      mo.model_id as modelId,\n      mo.model_name as modelName,\n      ma.manufacturer_name as manufacturer,    \n      cs.car_segment as carSegment,\n      uvv.address_id as addressId,\n      uvv.visitId,\n      uvv.visitStart,\n      uvv.visitEnd,\n      uvv.visitStatus,\n      uvv.role\n    FROM (SELECT\n            uv.is_deleted, \n            uv.user_id,\n            uv.firstName,\n            uv.lastName,\n            uv.companyName,\n            uv.phone,\n            uv.email,\n            uv.vehicle_id,\n            uv.model_id,\n            uv.vin,\n            uv.licensePlate,\n            uv.address_id,\n            uv.role,\n            vis.visit_id as visitId,\n            vis.visit_start as visitStart,\n            vis.visit_end as visitEnd,\n            vis.status as visitStatus\n          FROM (SELECT\n                  u.is_deleted,\n                  u.user_id,\n                  u.first_name as firstName,\n                  u.last_name as lastName,\n                  u.company_name as companyName,\n                  u.phone,\n                  u.email,\n                  u.address_id,\n                  u.role,\n                  v.vehicle_id,\n                  v.model_id,\n                  v.vin,\n                  v.license_plate as licensePlate\n                FROM users u LEFT OUTER JOIN vehicles v USING (user_id)\n                UNION\n                SELECT\n                  u.is_deleted,\n                  u.user_id,\n                  u.first_name as firstName,\n                  u.last_name as lastName,\n                  u.company_name as companyName,\n                  u.phone,\n                  u.email,\n                  u.address_id,\n                  u.role,\n                  v.vehicle_id,\n                  v.model_id,\n                  v.vin,\n                  v.license_plate as licensePlate\n                FROM users u RIGHT OUTER JOIN vehicles v USING (user_id)) as uv LEFT OUTER JOIN visits vis USING (vehicle_id)\n          UNION\n          SELECT\n            uv.is_deleted,\n            uv.user_id,\n            uv.firstName,\n            uv.lastName,\n            uv.companyName,\n            uv.phone,\n            uv.email,\n            uv.vehicle_id,\n            uv.model_id,\n            uv.vin,\n            uv.licensePlate,\n            uv.address_id,\n            uv.role,\n            vis.visit_id as visitId,\n            vis.visit_start as visitStart,\n            vis.visit_end as visitEnd,\n            vis.status as visitStatus\n          FROM (SELECT\n                  u.is_deleted,\n                  u.user_id,\n                  u.first_name as firstName,\n                  u.last_name as lastName,\n                  u.company_name as companyName,\n                  u.phone,\n                  u.email,\n                  u.address_id,\n                  u.role,\n                  v.vehicle_id,\n                  v.model_id,\n                  v.vin,\n                  v.license_plate as licensePlate\n                FROM users u LEFT OUTER JOIN vehicles v USING (user_id)\n                UNION\n                SELECT\n                  u.is_deleted,\n                  u.user_id,\n                  u.first_name as firstName,\n                  u.last_name as lastName,\n                  u.company_name as companyName,\n                  u.phone,\n                  u.email,\n                  u.address_id,\n                  u.role,\n                  v.vehicle_id,\n                  v.model_id,\n                  v.vin,\n                  v.license_plate as licensePlate\n                FROM users u RIGHT OUTER JOIN vehicles v USING (user_id)) as uv RIGHT OUTER JOIN visits vis USING (vehicle_id)) as uvv\n  LEFT JOIN addresses a USING (address_id)\n  LEFT JOIN models mo USING (model_id)\n  LEFT JOIN manufacturers ma USING (manufacturer_id)\n  LEFT JOIN car_segments cs USING (car_segment_id)\n  LEFT JOIN (SELECT\n            concat(first_name, \" \", last_name) as fullName,\n            user_id\n          FROM users) au USING (user_id)\n  WHERE uvv.is_deleted = 0\n    ".concat(name ? "AND au.fullName LIKE '%".concat(name, "%'") : '', "\n    ").concat(email ? "AND uvv.email LIKE '%".concat(email, "%'") : '', "\n    ").concat(phone ? "AND uvv.phone LIKE '%".concat(phone, "%'") : '', "\n    ").concat(modelName ? "AND mo.model_name = \"".concat(modelName, "\"") : '', "\n    ").concat(manufacturer ? "AND ma.manufacturer_name = \"".concat(manufacturer, "\"") : '', "\n    ").concat(carSegment ? "AND cs.car_segment = \"".concat(carSegment, "\"") : '', "\n    ").concat(visitRangeLow && visitRangeHigh ? "AND uvv.visit_start BETWEEN \"".concat(visitRangeLow, "\" AND \"").concat(visitRangeHigh, "\"") : '', "\n    GROUP BY uvv.user_id\n    ORDER BY ").concat(sortedColumn, " ").concat(direction, " \n    LIMIT ").concat(pageSize, " OFFSET ").concat(offset, "; \n  ");
        return [2 /*return*/, db.query(sql, [])];
    });
}); };
var getPasswordBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT password\n    FROM users\n    WHERE ".concat(column, " = ?\n  ");
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var updatePassword = function (userId, password) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n  UPDATE users SET  \n    password = ?\n  WHERE user_id = ?\n  ";
        return [2 /*return*/, db.query(sql, [password, userId])];
    });
}); };
export default {
    create: create,
    getPassword: getPassword,
    remove: remove,
    loginUser: loginUser,
    blacklistToken: blacklistToken,
    getBy: getBy,
    createAddress: createAddress,
    getByEmailPhone: getByEmailPhone,
    updateData: updateData,
    updateAddress: updateAddress,
    getAll: getAll,
    getPasswordBy: getPasswordBy,
    updatePassword: updatePassword,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3VzZXJzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0IsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFFaEQsSUFBTSxhQUFhLEdBQUcsVUFBTyxPQUFnQjs7Ozs7Z0JBRXpDLElBQUksR0FDRixPQUFPLEtBREwsRUFBRSxPQUFPLEdBQ1gsT0FBTyxRQURJLEVBQUUsVUFBVSxHQUN2QixPQUFPLFdBRGdCLEVBQUUsYUFBYSxHQUN0QyxPQUFPLGNBRCtCLENBQzlCO2dCQUVOLEdBQUcsR0FBRywwSUFRWCxDQUFDO2dCQUVhLHFCQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNqQyxJQUFJO3dCQUNKLE9BQU87d0JBQ1AsVUFBVTt3QkFDVixhQUFhLElBQUksSUFBSTtxQkFDdEIsQ0FBQyxFQUFBOztnQkFMSSxNQUFNLEdBQUcsU0FLYjtnQkFFSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsc0JBQU8sU0FBUyxFQUFDOzs7S0FDbEIsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFHLFVBQU8sSUFBVTs7Ozs7Z0JBRTVCLFNBQVMsR0FRUCxJQUFJLFVBUkcsRUFDVCxRQUFRLEdBT04sSUFBSSxTQVBFLEVBQ1IsV0FBVyxHQU1ULElBQUksWUFOSyxFQUNYLEtBQUssR0FLSCxJQUFJLE1BTEQsRUFDTCxLQUFLLEdBSUgsSUFBSSxNQUpELEVBQ0wsUUFBUSxHQUdOLElBQUksU0FIRSxFQUNSLFNBQVMsR0FFUCxJQUFJLFVBRkcsRUFDVCxJQUFJLEdBQ0YsSUFBSSxLQURGLENBQ0c7Z0JBRUgsR0FBRyxHQUFHLGtOQVlYLENBQUM7Z0JBRWtCLHFCQUFNLEVBQUUs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