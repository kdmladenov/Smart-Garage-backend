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
var getBy = function (column, value) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    SELECT\n      invoice_id as invoiceId,\n      visit_id as visitId,\n      date,\n      due_date as dueDate\n    FROM invoices\n    WHERE " + column + " = ?;\n  ";
                return [4 /*yield*/, db.query(sql, [value])];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
var create = function (visitId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n    INSERT INTO invoices (\n      visitId\n    )\n    VALUES (?);\n  ";
                return [4 /*yield*/, db.query(sql, [visitId])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, getBy('invoice_id', result.insertId)];
        }
    });
}); };
var getAll = function (userId, visitId, dateRangeLow, dateRangeHigh) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    SELECT\n      i.invoice_id as invoiceId,\n      i.visit_id as visitId,\n      i.date,\n      i.due_date as dueDate,\n      vi.vehicle_id as vehicleId,\n      ve.user_id as userId\n    FROM invoices as i\n    LEFT JOIN visits as vi USING (visit_id)\n    LEFT JOIN vehicles as ve USING (vehicle_id)\n    " + (visitId ? "AND visit_id = " + visitId : '') + "\n    " + (userId ? "AND user_id = ?" : '') + "\n    " + (dateRangeLow && dateRangeHigh ? "AND vis.visit_start BETWEEN ? AND ?" : "") + "\n  ";
        return [2 /*return*/, db.query(sql, [userId, dateRangeLow, dateRangeHigh])];
    });
}); };
export default {
    getBy: getBy,
    create: create,
    getAll: getAll,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZXMtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL2ludm9pY2VzLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNCLElBQU0sS0FBSyxHQUFHLFVBQU8sTUFBYyxFQUFFLEtBQWE7Ozs7O2dCQUMxQyxHQUFHLEdBQUcsb0pBT0YsTUFBTSxjQUNmLENBQUM7Z0JBRU0scUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFBO29CQUFwQyxzQkFBTyxDQUFDLFNBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzs7O0tBQzFDLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBRyxVQUFPLE9BQWU7Ozs7O2dCQUM3QixHQUFHLEdBQUcseUVBS1gsQ0FBQztnQkFFYSxxQkFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUE7O2dCQUF2QyxNQUFNLEdBQUcsU0FBOEI7Z0JBRTdDLHNCQUFPLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7S0FDN0MsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFHLFVBQU8sTUFBYyxFQUFFLE9BQWUsRUFBRSxZQUFvQixFQUFFLGFBQXFCOzs7UUFDMUYsR0FBRyxHQUFHLDBUQVdSLE9BQU8sQ0FBQyxDQUFDLENBQUMsb0JBQWtCLE9BQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFDL0IsWUFBWSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFDN0UsQ0FBQztRQUVGLHNCQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFDOztLQUM3RCxDQUFDO0FBRUYsZUFBZTtJQUNiLEtBQUssT0FBQTtJQUNMLE1BQU0sUUFBQTtJQUNOLE1BQU0sUUFBQTtDQUNQLENBQUMifQ==