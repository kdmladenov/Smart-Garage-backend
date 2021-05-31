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
var getServiceBy = function (name, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT\n  service_id as serviceId,\n  name,\n  price,\n  car_segment_id as carSegmentId\n  FROM services\n  WHERE name = ? AND car_segment_id = (SELECT car_segment_id FROM car_segments WHERE car_segment = ?) AND is_deleted = 0;\n  ";
                return [4 /*yield*/, db.query(sql, [name, carSegment])];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
var getAllServices = function (page, pageSize, priceLow, priceHigh, serviceName, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, sql;
    return __generator(this, function (_a) {
        offset = page ? (page - 1) * pageSize : 0;
        sql = "\n    SELECT\n    s.service_id as serviceId,\n    s.name,\n    s.price,\n    s.car_segment_id as carSegmentId,\n    cs.car_segment as carSegment\n    FROM services as s\n    LEFT JOIN car_segments as cs USING(car_segment_id)\n    WHERE is_deleted = 0\n    " + (serviceName && "AND s.name LIKE '%" + serviceName + "%'") + "\n    " + (carSegment && "AND cs.car_segment LIKE '%" + carSegment + "%'") + "\n    " + (priceLow && priceHigh && "AND price BETWEEN ? and ?") + "\n    LIMIT ? OFFSET ?;\n    ";
        return [2 /*return*/, db.query(sql, [priceLow, priceHigh, +pageSize, +offset])];
    });
}); };
var getBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n    s.service_id as serviceId,\n    s.name,\n    s.price,\n    s.car_segment_id as carSegmentId,\n    cs.car_segment as carSegment\n    FROM services as s\n    LEFT JOIN car_segments as cs USING(car_segment_id)\n    WHERE is_deleted = 0 AND " + column + " = ?\n    ;";
                return [4 /*yield*/, db.query(sql, [+value])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var createService = function (name, carSegment, price) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n      INSERT INTO services (\n        name,\n        car_segment_id,\n        price\n      )\n      VALUES (?, (SELECT car_segment_id FROM car_segments WHERE car_segment = ?), ?);\n    ";
                return [4 /*yield*/, db.query(sql, [name, carSegment, +price])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, getBy('service_id', result.insertId)];
        }
    });
}); };
var update = function (updated, serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n        UPDATE services\n        SET\n          name = ?,\n          price = ?,\n          car_segment_id = (SELECT car_segment_id FROM car_segments WHERE car_segment = ?)\n        WHERE service_id = ?\n    ";
                return [4 /*yield*/, db.query(sql, [
                        updated.name,
                        updated.price,
                        updated.carSegment,
                        serviceId,
                    ])];
            case 1:
                _ = _a.sent();
                return [2 /*return*/, getBy("service_id", +serviceId)];
        }
    });
}); };
var remove = function (serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n        UPDATE services \n        SET is_deleted = true\n        WHERE service_id = ?\n    ";
        return [2 /*return*/, db.query(sql, [+serviceId])];
    });
}); };
export default {
    getServiceBy: getServiceBy,
    createService: createService,
    getAllServices: getAllServices,
    update: update,
    remove: remove,
    getBy: getBy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3NlcnZpY2VzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzNCLElBQU0sWUFBWSxHQUFHLFVBQU8sSUFBWSxFQUFFLFVBQWtCOzs7OztnQkFDcEQsR0FBRyxHQUFHLDZPQVFYLENBQUM7Z0JBRU0scUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBQTtvQkFBL0Msc0JBQU8sQ0FBQyxTQUF1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7OztLQUNyRCxDQUFDO0FBRUYsSUFBTSxjQUFjLEdBQUcsVUFDckIsSUFBWSxFQUNaLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLFdBQW9CLEVBQ3BCLFVBQW1COzs7UUFFYixNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxHQUFHLEdBQUcsc1FBVVIsV0FBVyxJQUFJLHVCQUFxQixXQUFXLE9BQUksZ0JBQ25ELFVBQVUsSUFBSSwrQkFBNkIsVUFBVSxPQUFJLGdCQUN6RCxRQUFRLElBQUksU0FBUyxJQUFJLDJCQUEyQixtQ0FFckQsQ0FBQztRQUVKLHNCQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUM7O0tBQ2pFLENBQUM7QUFFRixJQUFNLEtBQUssR0FBRyxVQUFPLE1BQWMsRUFBRSxLQUFzQjs7Ozs7Z0JBQ25ELEdBQUcsR0FBRyxvUUFTaUIsTUFBTSxnQkFDL0IsQ0FBQztnQkFFVSxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQTs7Z0JBQXRDLE1BQU0sR0FBRyxTQUE2QjtnQkFDNUMsc0JBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDOzs7S0FDbEIsQ0FBQztBQUVGLElBQU0sYUFBYSxHQUFHLFVBQ3BCLElBQVksRUFDWixVQUFrQixFQUNsQixLQUFhOzs7OztnQkFFUCxHQUFHLEdBQUcsNkxBT1QsQ0FBQztnQkFHVyxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFBOztnQkFBeEQsTUFBTSxHQUFHLFNBQStDO2dCQUM5RCxzQkFBTyxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQzs7O0tBQzdDLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBRyxVQUFPLE9BQTJCLEVBQUUsU0FBaUI7Ozs7O2dCQUM1RCxHQUFHLEdBQUcsbU5BT1QsQ0FBQztnQkFFTSxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDNUIsT0FBTyxDQUFDLElBQUk7d0JBQ1osT0FBTyxDQUFDLEtBQUs7d0JBQ2IsT0FBTyxDQUFDLFVBQVU7d0JBQ2xCLFNBQVM7cUJBQ1YsQ0FBQyxFQUFBOztnQkFMSSxDQUFDLEdBQUcsU0FLUjtnQkFFRixzQkFBTyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUM7OztLQUN4QyxDQUFDO0FBRUYsSUFBTSxNQUFNLEdBQUcsVUFBTyxTQUFpQjs7O1FBQy9CLEdBQUcsR0FBRywrRkFJVCxDQUFDO1FBRUosc0JBQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUM7O0tBQ3BDLENBQUM7QUFFRixlQUFlO0lBQ2IsWUFBWSxjQUFBO0lBQ1osYUFBYSxlQUFBO0lBQ2IsY0FBYyxnQkFBQTtJQUNkLE1BQU0sUUFBQTtJQUNOLE1BQU0sUUFBQTtJQUNOLEtBQUssT0FBQTtDQUNOLENBQUMifQ==