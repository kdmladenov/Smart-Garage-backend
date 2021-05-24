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
import errors from "../common/service-errors";
var getById = function (invoicesData) { return function (invoiceId) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [2 /*return*/, {
                        error: null,
                        result: existingInvoice,
                    }];
        }
    });
}); }; };
var getAllInvoices = function (invoicesData) { return function (userId, visitId, dateRangeLow, dateRangeHigh) { return __awaiter(void 0, void 0, void 0, function () {
    var invoices;
    return __generator(this, function (_a) {
        invoices = invoicesData.getBy(userId, visitId, dateRangeLow, dateRangeHigh);
        return [2 /*return*/, {
                error: null,
                result: invoices,
            }];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZXMtc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvaW52b2ljZXMtc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsSUFBTSxPQUFPLEdBQUcsVUFBQyxZQUF5QixJQUFLLE9BQUEsVUFBTyxTQUFpQjs7OztvQkFDN0MscUJBQU0sWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUE7O2dCQUFuRSxlQUFlLEdBQUcsU0FBaUQ7Z0JBRXpFLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3BCLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCOzRCQUM5QixNQUFNLEVBQUUsSUFBSTt5QkFDYixFQUFDO2lCQUNIO2dCQUVELHNCQUFPO3dCQUNMLEtBQUssRUFBRSxJQUFJO3dCQUNYLE1BQU0sRUFBRSxlQUFlO3FCQUN4QixFQUFDOzs7S0FDSCxFQWQ4QyxDQWM5QyxDQUFDO0FBRUYsSUFBTSxjQUFjLEdBQUcsVUFBQyxZQUF5QixJQUFLLE9BQUEsVUFBTyxNQUFjLEVBQUUsT0FBZSxFQUFFLFlBQW9CLEVBQUUsYUFBcUI7OztRQUNqSSxRQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVsRixzQkFBTztnQkFDTCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUUsUUFBUTthQUNqQixFQUFDOztLQUNILEVBUHFELENBT3JELENBQUM7QUFFRixJQUFNLGFBQWEsR0FBRyxVQUFDLFlBQXlCLElBQUssT0FBQSxVQUFPLE9BQWU7Ozs7b0JBQ2pELHFCQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFBOztnQkFBL0QsZUFBZSxHQUFHLFNBQTZDO2dCQUVyRSxJQUFJLGVBQWUsRUFBRTtvQkFDbkIsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLE1BQU0sRUFBRSxJQUFJO3lCQUNiLEVBQUM7aUJBQ0g7Z0JBRWUscUJBQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQTs7Z0JBQTVDLE9BQU8sR0FBRyxTQUFrQztnQkFFbEQsc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsTUFBTSxFQUFFLE9BQU87cUJBQ2hCLEVBQUM7OztLQUNILEVBaEJvRCxDQWdCcEQsQ0FBQztBQUVGLGVBQWU7SUFDYixPQUFPLFNBQUE7SUFDUCxjQUFjLGdCQUFBO0lBQ2QsYUFBYSxlQUFBO0NBQ2QsQ0FBQyJ9