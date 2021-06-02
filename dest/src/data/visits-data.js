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
var registerVisit = function (notes, vehicleId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, visitId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    INSERT INTO visits (\n      notes,\n      vehicle_id\n    )\n    VALUES (?, ?);\n  ";
                return [4 /*yield*/, db.query(sql, [notes, vehicleId])];
            case 1:
                result = _a.sent();
                visitId = result.insertId;
                return [2 /*return*/, {
                        notes: notes,
                        vehicleId: vehicleId,
                        visitId: visitId,
                    }];
        }
    });
}); };
var registerPerformedServices = function (services, visitId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    INSERT INTO performed_services (\n      visit_id,\n      service_id,\n      service_qty,\n      price\n    )\n    VALUES (?, ?, ?, ?)\n  ";
        return [2 /*return*/, services.map(function (s) { return db.query(sql, [visitId, s.serviceId, s.serviceQty, s.price]); })];
    });
}); };
var registerUsedParts = function (parts, visitId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    INSERT INTO used_parts (\n      visit_id,\n      part_id,\n      part_qty,\n      price\n    )\n    VALUES (?, ?, ?, ?)\n  ";
        return [2 /*return*/, parts.map(function (p) { return db.query(sql, [visitId, p.partId, p.partQty, p.price]); })];
    });
}); };
var getVisitBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n      vis.notes,\n      vis.visit_start as visitStart,\n      vis.visit_end as visitEnd,\n      vis.status,\n      vis.vehicle_id as vehicleId,\n      veh.vin,\n      veh.license_plate as licensePlate,\n      veh.manufactured_year as manufacturedYear,\n      veh.engine_type as engineType,\n      veh.transmission,\n      veh.model_id as modelId,\n      m.model_name as modelName,\n      m.manufacturer_id as manufacturerId,\n      man.manufacturer_name as manufacturerName,\n      m.car_segment_id as carSegment,\n      veh.user_id as userId,\n      u.first_name as firstName,\n      u.last_name as lastName,\n      u.company_name as companyName,\n      u.phone,\n      u.email,\n      u.address_id as addressId,\n      a.country,\n      a.city,\n      a.street_address as streetAddress\n    FROM visits as vis\n    LEFT JOIN vehicles as veh USING(vehicle_id)\n    LEFT JOIN models as m USING(model_id)\n    LEFT JOIN manufacturers as man USING(manufacturer_id)\n    LEFT JOIN users as u USING(user_id)\n    LEFT JOIN addresses as a USING(address_id)\n    WHERE " + column + " = ?;\n  ";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
var getPerformedServicesByVisitId = function (visitId, serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    SELECT\n      ps.visit_id as visitId,\n      ps.service_id as serviceId,\n      ps.service_qty as serviceQty,\n      ps.price,\n      s.name\n    FROM performed_services as ps\n    LEFT JOIN services as s USING(service_id)\n    WHERE ps.service_qty !=0 AND visit_id = ?\n    " + (serviceId ? "AND service_id = ?" : '') + "    \n  ";
        return [2 /*return*/, db.query(sql, [visitId, serviceId])];
    });
}); };
var getUsedPartsByVisitId = function (visitId, partId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n  SELECT\n    up.visit_id as visitId,\n    up.part_id as partId,\n    up.part_qty as partQty,\n    up.price,\n    p.name\n  FROM used_parts as up\n  LEFT JOIN parts as p USING(part_id)\n  WHERE up.part_qty !=0 AND visit_id = ?\n  " + (partId ? "AND part_id = ?" : '') + "\n";
        return [2 /*return*/, db.query(sql, [visitId, partId])];
    });
}); };
var getAllVisitsBy = function (userId, vehicleId, visitRangeLow, visitRangeHigh, visitStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n  SELECT\n    vis.notes,\n    vis.visit_id as visitId,\n    vis.visit_start as visitStart,\n    vis.visit_end as visitEnd,\n    vis.status,\n    vis.vehicle_id as vehicleId,\n    veh.vin,\n    veh.license_plate as licensePlate,\n    veh.manufactured_year as manufacturedYear,\n    veh.engine_type as engineType,\n    veh.transmission,\n    veh.model_id as modelId,\n    m.model_name as modelName,\n    m.manufacturer_id as manufacturerId,\n    man.manufacturer_name as manufacturerName,\n    m.car_segment_id as carSegmentId,\n    cs.car_segment as carSegment,\n    veh.user_id as userId,\n    u.first_name as firstName,\n    u.last_name as lastName,\n    u.company_name as companyName,\n    u.phone,\n    u.email,\n    u.address_id as addressId,\n    a.country,\n    a.city,\n    a.street_address as streetAddress\n  FROM visits as vis\n  LEFT JOIN vehicles as veh USING(vehicle_id)\n  LEFT JOIN models as m USING(model_id)\n  LEFT JOIN manufacturers as man USING(manufacturer_id)\n  LEFT JOIN users as u USING(user_id)\n  LEFT JOIN addresses as a USING(address_id)\n  LEFT JOIN car_segments as cs USING(car_segment_id)\n  WHERE visit_id > 0\n  " + (userId ? "AND user_id = " + userId : '') + "\n  " + (vehicleId ? "AND vehicle_id = " + vehicleId : '') + "\n  " + (visitStatus && "AND vis.status LIKE '%" + visitStatus + "%'") + "\n  " + (visitRangeLow && visitRangeHigh ? "AND vis.visit_start BETWEEN \"" + visitRangeLow + "\" AND \"" + visitRangeHigh + "\"" : '') + "\n  ";
        return [2 /*return*/, db.query(sql, [])];
    });
}); };
var updateVisit = function (visitId, notes, visitEnd, status) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    UPDATE visits SET\n      notes = ?,\n      visit_end = ?,\n      status = ?\n    WHERE visit_id = ?\n  ";
        return [2 /*return*/, db.query(sql, [notes, visitEnd, status, visitId])];
    });
}); };
var updatePerformedService = function (visitId, serviceId, serviceQty, price) {
    var sql = "\n    UPDATE performed_services SET \n      service_qty = ?,\n      price = ?\n    WHERE visit_id = ? AND service_id = ?;\n  ";
    return db.query(sql, [serviceQty, price, visitId, serviceId]);
};
var updateUsedPart = function (visitId, partId, partQty, price) {
    var sql = "\n    UPDATE used_parts SET \n      part_qty = ?,\n      price = ?\n    WHERE visit_id = ? AND part_id = ?;\n  ";
    return db.query(sql, [partQty, price, visitId, partId]);
};
export default {
    registerVisit: registerVisit,
    registerPerformedServices: registerPerformedServices,
    registerUsedParts: registerUsedParts,
    getVisitBy: getVisitBy,
    getPerformedServicesByVisitId: getPerformedServicesByVisitId,
    getUsedPartsByVisitId: getUsedPartsByVisitId,
    getAllVisitsBy: getAllVisitsBy,
    updateVisit: updateVisit,
    updatePerformedService: updatePerformedService,
    updateUsedPart: updateUsedPart,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzLWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YS92aXNpdHMtZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0IsSUFBTSxhQUFhLEdBQUcsVUFBTyxLQUFhLEVBQUUsU0FBaUI7Ozs7O2dCQUNyRCxHQUFHLEdBQUcsMkZBTVgsQ0FBQztnQkFFYSxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFBOztnQkFBaEQsTUFBTSxHQUFHLFNBQXVDO2dCQUNoRCxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFFaEMsc0JBQU87d0JBQ0wsS0FBSyxPQUFBO3dCQUNMLFNBQVMsV0FBQTt3QkFDVCxPQUFPLFNBQUE7cUJBQ1IsRUFBQzs7O0tBQ0gsQ0FBQztBQUVGLElBQU0seUJBQXlCLEdBQUcsVUFBTyxRQUE4QyxFQUFFLE9BQWU7OztRQUNoRyxHQUFHLEdBQUcsaUpBUVgsQ0FBQztRQUVGLHNCQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQTVELENBQTRELENBQUMsRUFBQzs7S0FDeEYsQ0FBQztBQUVGLElBQU0saUJBQWlCLEdBQUcsVUFBTyxLQUEyQyxFQUFFLE9BQWU7OztRQUNyRixHQUFHLEdBQUcsbUlBUVgsQ0FBQztRQUVGLHNCQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcs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