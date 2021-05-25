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
import errors from '../common/service-errors';
import rolesEnum from '../common/roles.enum.js';
var getById = function (invoicesData) { return function (invoiceId, loggedUserId, role) { return __awaiter(void 0, void 0, void 0, function () {
    var existingInvoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, invoicesData.getBy('invoice_id', invoiceId)];
            case 1:
                existingInvoice = _a.sent();
                if (!existingInvoice) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                if (existingInvoice.userId !== loggedUserId && role !== rolesEnum.employee) {
                    return [2 /*return*/, {
                            error: errors.OPERATION_NOT_PERMITTED,
                            result: null,
                        }];
                }
                return [2 /*return*/, {
                        error: null,
                        result: existingInvoice,
                    }];
        }
    });
}); }; };
var getAllInvoices = function (invoicesData, usersData, visitsData) { return function (userId, visitId, dateRangeLow, dateRangeHigh, loggedUserId, role) { return __awaiter(void 0, void 0, void 0, function () {
    var invoices, existingUser, existingVisit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (userId !== loggedUserId && role !== rolesEnum.employee) {
                    return [2 /*return*/, {
                            error: errors.OPERATION_NOT_PERMITTED,
                            result: null,
                        }];
                }
                invoices = invoicesData.getBy(userId, visitId, dateRangeLow, dateRangeHigh);
                if (!userId) return [3 /*break*/, 2];
                return [4 /*yield*/, usersData.getBy('user_id', userId)];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                _a.label = 2;
            case 2:
                if (!visitId) return [3 /*break*/, 4];
                return [4 /*yield*/, visitsData.getVisitBy('visit_id', visitId)];
            case 3:
                existingVisit = _a.sent();
                if (!existingVisit) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                _a.label = 4;
            case 4: return [2 /*return*/, {
                    error: null,
                    result: invoices,
                }];
        }
    });
}); }; };
var createInvoice = function (invoicesData) { return function (visitId) { return __awaiter(void 0, void 0, void 0, function () {
    var existingInvoice, invoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, invoicesData.getBy('visit_id', visitId)];
            case 1:
                existingInvoice = _a.sent();
                if (existingInvoice) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                return [4 /*yield*/, invoicesData.create(visitId)];
            case 2:
                invoice = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: invoice,
                    }];
        }
    });
}); }; };
export default {
    getById: getById,
    getAllInvoices: getAllInvoices,
    createInvoice: createInvoice,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZXMtc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvaW52b2ljZXMtc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxNQUFNLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFFaEQsSUFBTSxPQUFPLEdBQUcsVUFBQyxZQUF5QixJQUFLLE9BQUEsVUFBTyxTQUFpQixFQUFFLFlBQW9CLEVBQUUsSUFBWTs7OztvQkFDakYscUJBQU0sWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUE7O2dCQUFuRSxlQUFlLEdBQUcsU0FBaUQ7Z0JBRXpFLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3BCLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCOzRCQUM5QixNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIO2dCQUVELElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxZQUFZLElBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQzFFLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsdUJBQXVCOzRCQUNyQyxNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIO2dCQUVELHNCQUFPO3dCQUNMLEtBQUssRUFBRSxJQUFJO3dCQUNYLE1BQU0sRUFBRSxlQUFlO3FCQUN4QixFQUFDOzs7S0FDSCxFQXJCOEMsQ0FxQjlDLENBQUM7QUFFRixJQUFNLGNBQWMsR0FBRyxVQUFDLFlBQXlCLEVBQUUsU0FBb0IsRUFBRSxVQUFzQixJQUFLLE9BQUEsVUFDbEcsTUFBYyxFQUNkLE9BQWUsRUFDZixZQUFvQixFQUNwQixhQUFxQixFQUNyQixZQUFvQixFQUNwQixJQUFZOzs7OztnQkFFWixJQUFJLE1BQU0sS0FBSyxZQUFZLElBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQzFELHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsdUJBQXVCOzRCQUNyQyxNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIO2dCQUVLLFFBQVEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3FCQUU5RSxNQUFNLEVBQU4sd0JBQU07Z0JBQ2EscUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUE7O2dCQUF2RCxZQUFZLEdBQUcsU0FBd0M7Z0JBQzdELElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCOzRCQUM5QixNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIOzs7cUJBRUMsT0FBTyxFQUFQLHdCQUFPO2dCQUNhLHFCQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFBOztnQkFBaEUsYUFBYSxHQUFHLFNBQWdEO2dCQUN0RSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNsQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDs7b0JBR0gsc0JBQU87b0JBQ0wsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCLEVBQUM7OztLQUNILEVBeENtRyxDQXdDbkcsQ0FBQztBQUVGLElBQU0sYUFBYSxHQUFHLFVBQUMsWUFBeUIsSUFBSyxPQUFBLFVBQU8sT0FBZTs7OztvQkFDakQscUJBQU0sWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUE7O2dCQUEvRCxlQUFlLEdBQUcsU0FBNkM7Z0JBRXJFLElBQUksZUFBZSxFQUFFO29CQUNuQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFFZSxxQkFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztnQkFBNUMsT0FBTyxHQUFHLFNBQWtDO2dCQUVsRCxzQkFBTzt3QkFDTCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxNQUFNLEVBQUUsT0FBTztxQkFDaEIsRUFBQzs7O0tBQ0gsRUFoQm9ELENBZ0JwRCxDQUFDO0FBRUYsZUFBZTtJQUNiLE9BQU8sU0FBQTtJQUNQLGNBQWMsZ0JBQUE7SUFDZCxhQUFhLGVBQUE7Q0FDZCxDQUFDIn0=