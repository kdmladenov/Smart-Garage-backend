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
                sql = "\n    INSERT INTO visits (\n      notes,\n      vehicle_id\n    )\n    VALUES (?, ?, ?);\n  ";
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
        services.forEach(function (s) {
            var _ = db.query(sql, [visitId, s.serviceId, s.quantity, s.price]);
        });
        return [2 /*return*/];
    });
}); };
var registerUsedParts = function (parts, visitId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = "\n    INSERT INTO performed_services (\n      visit_id,\n      service_id,\n      service_qty,\n      price\n    )\n    VALUES (?, ?, ?, ?)\n  ";
        parts.forEach(function (p) {
            var _ = db.query(sql, [visitId, p.partId, p.quantity, p.price]);
        });
        return [2 /*return*/];
    });
}); };
export default {
    registerVisit: registerVisit,
    registerPerformedServices: registerPerformedServices,
    registerUsedParts: registerUsedParts,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL3Zpc2l0c0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNCLElBQU0sYUFBYSxHQUFHLFVBQU8sS0FBYSxFQUFFLFNBQWlCOzs7OztnQkFDckQsR0FBRyxHQUFHLDhGQU1YLENBQUM7Z0JBRWEscUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBQTs7Z0JBQWhELE1BQU0sR0FBRyxTQUF1QztnQkFDaEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBRWhDLHNCQUFPO3dCQUNMLEtBQUssT0FBQTt3QkFDTCxTQUFTLFdBQUE7d0JBQ1QsT0FBTyxTQUFBO3FCQUNSLEVBQUM7OztLQUNILENBQUM7QUFFRixJQUFNLHlCQUF5QixHQUFHLFVBQU8sUUFBNEMsRUFBRSxPQUFlOzs7UUFDOUYsR0FBRyxHQUFHLGlKQVFYLENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNoQixJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7OztLQUNKLENBQUM7QUFFRixJQUFNLGlCQUFpQixHQUFHLFVBQU8sS0FBeUMsRUFBRSxPQUFlOzs7UUFDbkYsR0FBRyxHQUFHLGlKQVFYLENBQUM7UUFFRixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNiLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQzs7O0tBQ0osQ0FBQztBQUVGLGVBQWU7SUFDYixhQUFhLGVBQUE7SUFDYix5QkFBeUIsMkJBQUE7SUFDekIsaUJBQWlCLG1CQUFBO0NBQ2xCLENBQUMifQ==