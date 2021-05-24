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
import express from 'express';
// import { paging } from '../common/constants.js';
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';
import invoicesService from '../services/invoices-services.js';
import errors from '../common/service-errors.js';
import invoicesData from '../data/invoices-data.js';
var invoicesController = express.Router();
invoicesController
    .get('/', authMiddleware, loggedUserGuard, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, loggedUserId, role, _b, visitId, userId, _c, dateRangeLow, dateRangeHigh, validatedUserId, validatedVisitId, _d, result, error;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.user, loggedUserId = _a.userId, role = _a.role;
                _b = req.query, visitId = _b.visitId, userId = _b.userId;
                _c = req.query, dateRangeLow = _c.dateRangeLow, dateRangeHigh = _c.dateRangeHigh;
                dateRangeLow = typeof dateRangeLow === 'string' ? dateRangeLow : '';
                dateRangeHigh = typeof dateRangeHigh === 'string' ? dateRangeHigh : '';
                validatedUserId = userId ? +userId : 0;
                validatedVisitId = visitId ? +visitId : 0;
                return [4 /*yield*/, invoicesService.getAllInvoices(invoicesData)(validatedUserId, validatedVisitId, dateRangeLow, dateRangeHigh)];
            case 1:
                _d = _e.sent(), result = _d.result, error = _d.error;
                if (error === errors.RECORD_NOT_FOUND) {
                    return [2 /*return*/, res.status(404).send({
                            message: "Visit with id " + visitId + " is not found.",
                        })];
                }
                if (error === errors.OPERATION_NOT_PERMITTED) {
                    return [2 /*return*/, res.status(403).send({
                            message: "This resource is forbidden!",
                        })];
                }
                return [2 /*return*/, res.status(200).send(result)];
        }
    });
}); }));
export default invoicesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZXMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9pbnZvaWNlcy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBOEIsTUFBTSxTQUFTLENBQUM7QUFDckQsbURBQW1EO0FBQ25ELE9BQU8sY0FBYyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBTS9ELE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sWUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBS3BELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTVDLGtCQUFrQjtLQUNmLEdBQUcsQ0FDRixHQUFHLEVBQ0gsY0FBYyxFQUNkLGVBQWUsRUFDZixZQUFZLENBQUMsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQ3ZDLEtBQWlDLEdBQUcsQ0FBQyxJQUFLLEVBQWhDLFlBQVksWUFBQSxFQUFFLElBQUksVUFBQSxDQUFlO2dCQUMzQyxLQUFzQixHQUFHLENBQUMsS0FBSyxFQUE3QixPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUEsQ0FBZTtnQkFDbEMsS0FBa0MsR0FBRyxDQUFDLEtBQUssRUFBekMsWUFBWSxrQkFBQSxFQUFFLGFBQWEsbUJBQUEsQ0FBZTtnQkFFaEQsWUFBWSxHQUFHLE9BQU8sWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BFLGFBQWEsR0FBRyxPQUFPLGFBQWEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNqRSxlQUFlLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLHFCQUFNLGVBQWUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsRUFBQTs7Z0JBQXRJLEtBQW9CLFNBQWtILEVBQXBJLE1BQU0sWUFBQSxFQUFFLEtBQUssV0FBQTtnQkFFckIsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLGdCQUFnQixFQUFFO29CQUNyQyxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDMUIsT0FBTyxFQUFFLG1CQUFpQixPQUFPLG1CQUFnQjt5QkFDbEQsQ0FBQyxFQUFDO2lCQUNKO2dCQUVELElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRTtvQkFDNUMsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQzFCLE9BQU8sRUFBRSw2QkFBNkI7eUJBQ3ZDLENBQUMsRUFBQztpQkFDSjtnQkFFRCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQzs7O0tBQ3JDLENBQUMsQ0FDSCxDQUFDO0FBQ0osZUFBZSxrQkFBa0IsQ0FBQyJ9