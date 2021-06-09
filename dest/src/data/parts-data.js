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
var getPartBy = function (name, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n      part_id as partId,\n      name,\n      price,\n      car_segment_id as carSegmentId\n    FROM parts\n    WHERE name = ? AND car_segment_id = (SELECT car_segment_id FROM car_segments WHERE car_segment = ?) AND is_deleted = 0;\n  ";
                return [4 /*yield*/, db.query(sql, [name, carSegment])];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
var getAllParts = function (page, pageSize, priceLow, priceHigh, partName, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, sql;
    return __generator(this, function (_a) {
        offset = page ? (page - 1) * pageSize : 0;
        sql = "\n    SELECT    \n    COUNT(*) OVER () AS totalDBItems,\n    s.part_id as partId,\n    s.name,\n    s.price,\n    s.car_segment_id as carSegmentId,\n    cs.car_segment as carSegment\n    FROM parts as s\n    LEFT JOIN car_segments as cs USING(car_segment_id)\n    WHERE is_deleted = 0\n    " + (partName && "AND s.name LIKE '%" + partName + "%'") + "\n    " + (carSegment && "AND cs.car_segment LIKE '%" + carSegment + "%'") + "\n    " + (priceLow && priceHigh && 'AND price BETWEEN ? and ?') + "\n    " + (pageSize ? "LIMIT ? OFFSET ?" : '') + ";\n    ";
        return [2 /*return*/, db.query(sql, [priceLow, priceHigh, +pageSize, +offset])];
    });
}); };
var getBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n    s.part_id as partId,\n    s.name,\n    s.price,\n    s.car_segment_id as carSegmentId,\n    cs.car_segment as carSegment\n    FROM parts as s\n    LEFT JOIN car_segments as cs USING(car_segment_id)\n    WHERE is_deleted = 0 AND " + column + " = ?\n    ;";
                return [4 /*yield*/, db.query(sql, [+value])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
        }
    });
}); };
var createPart = function (name, carSegment, price) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n      INSERT INTO parts (\n        name,\n        car_segment_id,\n        price\n        )\n        VALUES (?, (SELECT car_segment_id FROM car_segments WHERE car_segment = ?), ?);\n        ";
                return [4 /*yield*/, db.query(sql, [name, carSegment, +price])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, getBy("part_id", result.insertId)];
        }
    });
}); };
var update = function (updated, partId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n        UPDATE parts\n        SET\n        name = ?,\n          price = ?,\n          car_segment_id = (SELECT car_segment_id FROM car_segments WHERE car_segment = ?)\n        WHERE part_id = ?\n    ";
                return [4 /*yield*/, db.query(sql, [
                        updated.name,
                        updated.price,
                        updated.carSegment,
                        partId,
                    ])];
            case 1:
                _ = _a.sent();
                return [2 /*return*/, getBy("part_id", +partId)];
        }
    });
}); };
var remove = function (partId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n        UPDATE parts \n        SET is_deleted = true\n        WHERE part_id = ?\n    ";
        return [2 /*return*/, db.query(sql, [+partId])];
    });
}); };
export default {
    getPartBy: getPartBy,
    createPart: createPart,
    getAllParts: getAllParts,
    update: update,
    remove: remove,
    getBy: getBy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3BhcnRzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzNCLElBQU0sU0FBUyxHQUFHLFVBQU8sSUFBWSxFQUFFLFVBQWtCOzs7OztnQkFDakQsR0FBRyxHQUFHLDBQQVFYLENBQUM7Z0JBRU0scUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBQTtvQkFBL0Msc0JBQU8sQ0FBQyxTQUF1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7OztLQUNyRCxDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQUcsVUFDbEIsSUFBWSxFQUNaLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLFFBQWlCLEVBQ2pCLFVBQW1COzs7UUFFYixNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxHQUFHLEdBQUcsd1NBV1IsUUFBUSxJQUFJLHVCQUFxQixRQUFRLE9BQUksZ0JBQzdDLFVBQVUsSUFBSSwrQkFBNkIsVUFBVSxPQUFJLGdCQUN6RCxRQUFRLElBQUksU0FBUyxJQUFJLDJCQUEyQixnQkFDcEQsUUFBUSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUNuQyxDQUFDO1FBRUosc0JBQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQzs7S0FDakUsQ0FBQztBQUVGLElBQU0sS0FBSyxHQUFHLFVBQU8sTUFBYyxFQUFFLEtBQXNCOzs7OztnQkFDbkQsR0FBRyxHQUFHLDJQQVNpQixNQUFNLGdCQUMvQixDQUFDO2dCQUVVLHFCQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFBOztnQkFBdEMsTUFBTSxHQUFHLFNBQTZCO2dCQUM1QyxzQkFBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUM7OztLQUNsQixDQUFDO0FBRUYsSUFBTSxVQUFVLEdBQUcsVUFDakIsSUFBWSxFQUNaLFVBQWtCLEVBQ2xCLEtBQWE7Ozs7O2dCQUVQLEdBQUcsR0FBRyxrTUFPTCxDQUFDO2dCQUVPLHFCQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUE7O2dCQUF4RCxNQUFNLEdBQUcsU0FBK0M7Z0JBQzlELHNCQUFPLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7S0FDMUMsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFHLFVBQU8sT0FBd0IsRUFBRSxNQUFjOzs7OztnQkFDdEQsR0FBRyxHQUFHLDJNQU9ULENBQUM7Z0JBRU0scUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQzVCLE9BQU8sQ0FBQyxJQUFJO3dCQUNaLE9BQU8sQ0FBQyxLQUFLO3dCQUNiLE9BQU8sQ0FBQyxVQUFVO3dCQUNsQixNQUFNO3FCQUNQLENBQUMsRUFBQTs7Z0JBTEksQ0FBQyxHQUFHLFNBS1I7Z0JBRUYsc0JBQU8sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFDOzs7S0FDbEMsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFHLFVBQU8sTUFBYzs7O1FBQzVCLEdBQUcsR0FBRyx5RkFJVCxDQUFDO1FBRUosc0JBQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUM7O0tBQ2pDLENBQUM7QUFFRixlQUFlO0lBQ2IsU0FBUyxXQUFBO0lBQ1QsVUFBVSxZQUFBO0lBQ1YsV0FBVyxhQUFBO0lBQ1gsTUFBTSxRQUFBO0lBQ04sTUFBTSxRQUFBO0lBQ04sS0FBSyxPQUFBO0NBQ04sQ0FBQyJ9