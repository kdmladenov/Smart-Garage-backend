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
var getManufacturerBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n      manufacturer_id as id,\n      manufacturer_name as name\n    FROM manufacturers\n    WHERE " + column + " = ?;\n  ";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var createManufacturer = function (manufacturer) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    INSERT INTO manufacturers (\n      manufacturer_name\n    )\n    VALUES (?);\n  ";
        return [2 /*return*/, db.query(sql, [manufacturer])];
    });
}); };
var getModelBy = function (column, value, manufacturer) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n      m.model_id as id,\n      m.model_name as modelName,\n      mf.manufacturer_name as manufacturer,\n      cs.car_segment as carSegment\n    FROM models as m\n    LEFT JOIN manufacturers as mf USING(manufacturer_id)\n    LEFT JOIN car_segments as cs USING(car_segment_id)\n    WHERE " + column + " = ? AND manufacturer_name = ?;\n  ";
                return [4 /*yield*/, db.query(sql, [value, manufacturer])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var createModel = function (modelName, manufacturer, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    INSERT INTO models (\n      model_name,\n      manufacturer_id,\n      car_segment_id\n    )\n    VALUES (?, (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name = ?), (SELECT car_segment_id FROM car_segments WHERE car_segment = ?));\n  ";
        return [2 /*return*/, db.query(sql, [modelName, manufacturer, carSegment])];
    });
}); };
var getVehicleBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n      vehicle_id as vehicleId,\n      vin,\n      license_plate as licensePlate,\n      user_id as userId,\n      model_id as modelId,\n      manufactured_year as manufacturedYear,\n      engine_type as engineType,\n      transmission\n    FROM vehicles\n    WHERE is_deleted = 0 AND " + column + " = ?;\n  ";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var create = function (vehicle) { return __awaiter(void 0, void 0, void 0, function () {
    var vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission, sql, createdVehicle, vehicleId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vin = vehicle.vin, licensePlate = vehicle.licensePlate, userId = vehicle.userId, modelId = vehicle.modelId, manufacturedYear = vehicle.manufacturedYear, engineType = vehicle.engineType, transmission = vehicle.transmission;
                console.log(vehicle);
                sql = "\n    INSERT INTO vehicles (\n      vin,\n      license_plate,\n      user_id,\n      model_id,\n      manufactured_year,\n      engine_type,\n      transmission\n    )\n    VALUES (?, ?, ?, ?, ?, ?, ?);\n  ";
                return [4 /*yield*/, db.query(sql, [vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission])];
            case 1:
                createdVehicle = _a.sent();
                vehicleId = createdVehicle.insertId;
                return [2 /*return*/, __assign(__assign({}, vehicle), { vehicleId: vehicleId })];
        }
    });
}); };
var update = function (vehicle) { return __awaiter(void 0, void 0, void 0, function () {
    var vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission, vehicleId, sql, _;
    return __generator(this, function (_a) {
        vin = vehicle.vin, licensePlate = vehicle.licensePlate, userId = vehicle.userId, modelId = vehicle.modelId, manufacturedYear = vehicle.manufacturedYear, engineType = vehicle.engineType, transmission = vehicle.transmission, vehicleId = vehicle.vehicleId;
        sql = "\n    UPDATE vehicles SET\n      vin = ?,\n      license_plate = ?,\n      user_id = ?,\n      model_id = ?,\n      manufactured_year = ?,\n      engine_type = ?,\n      transmission = ?\n    WHERE vehicle_id = ?\n  ";
        _ = db.query(sql, [vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission, vehicleId]);
        return [2 /*return*/, vehicle];
    });
}); };
var getAll = function (page, pagesize, email, fullName, userId, manufacturer, modelName, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var sortColumn, direction, offset, sql;
    return __generator(this, function (_a) {
        sortColumn = 'ma.manufacturer_name';
        direction = 'ASC';
        offset = page ? (page - 1) * pagesize : 0;
        sql = "\n  SELECT\n    v.vehicle_id as vehicleId,\n    v.vin,\n    v.license_plate as licensePlate,\n    v.model_id as modelId,\n    v.manufactured_year as manufacturedYear,\n    v.engine_type as engineType,\n    v.transmission,\n    v.user_id as userId,\n    u.email as email,\n    u.full_name as fullName,\n    mo.manufacturer_id as manufacturerId,\n    mo.car_segment_id as carSegmentId,\n    mo.model_name as modelName,\n    ma.manufacturer_name as manufacturer,\n    se.car_segment as carSegment\n  FROM vehicles as v\n  LEFT JOIN models as mo USING(model_id)\n  LEFT JOIN manufacturers as ma USING(manufacturer_id)\n  LEFT JOIN car_segments as se USING(car_segment_id)\n  LEFT JOIN (SELECT \n              CONCAT(first_name, ' ', last_name) as full_name,\n              email,\n              user_id,\n              is_deleted\n            FROM users) as u USING(user_id)\n  WHERE u.is_deleted = 0 " + (email && "AND u.email LIKE('%" + email + "%')") + " \n  " + (fullName && "AND u.full_name like('%" + fullName + "%')") + "\n  " + (userId > 0 ? "AND u.user_id = " + userId : '') + "\n  " + (manufacturer && "AND ma.manufacturer_name like('%" + manufacturer + "%')") + "\n  " + (modelName && "AND mo.model_name like('%" + modelName + "%')") + "\n  " + (carSegment && "AND se.car_segment like('%" + carSegment + "%')") + "\n  ORDER BY " + sortColumn + " " + direction + "       \n  LIMIT ? OFFSET ?;  \n  ";
        return [2 /*return*/, db.query(sql, [pagesize, offset])];
    });
}); };
export default {
    getManufacturerBy: getManufacturerBy,
    createManufacturer: createManufacturer,
    getModelBy: getModelBy,
    createModel: createModel,
    getVehicleBy: getVehicleBy,
    create: create,
    update: update,
    getAll: getAll,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZXMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3ZlaGljbGVzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0IsSUFBTSxpQkFBaUIsR0FBRyxVQUFPLE1BQWMsRUFBRSxLQUFzQjs7Ozs7Z0JBQy9ELEdBQUcsR0FBRyxvSEFLRixNQUFNLGNBQ2YsQ0FBQztnQkFFYSxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUE7O2dCQUFyQyxNQUFNLEdBQUcsU0FBNEI7Z0JBQzNDLHNCQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQzs7O0tBQ2xCLENBQUM7QUFFRixJQUFNLGtCQUFrQixHQUFHLFVBQU8sWUFBb0I7OztRQUM5QyxHQUFHLEdBQUcsd0ZBS1gsQ0FBQztRQUVGLHNCQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQzs7S0FDdEMsQ0FBQztBQUVGLElBQU0sVUFBVSxHQUFHLFVBQU8sTUFBYyxFQUFFLEtBQXNCLEVBQUUsWUFBb0I7Ozs7O2dCQUU5RSxHQUFHLEdBQUcsaVRBU0YsTUFBTSx3Q0FDZixDQUFDO2dCQUVhLHFCQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQUE7O2dCQUFuRCxNQUFNLEdBQUcsU0FBMEM7Z0JBQ3pELHNCQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQzs7O0tBQ2xCLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxVQUFPLFNBQWlCLEVBQUUsWUFBb0IsRUFBRSxVQUFrQjs7O1FBQzlFLEdBQUcsR0FBRyxtUUFPWCxDQUFD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