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
import errors from "../common/service-errors.js";
var createService = function (servicesData) { return function (name, price, carSegmentId) { return __awaiter(void 0, void 0, void 0, function () {
    var existingService, service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, servicesData.getServiceBy(name, carSegmentId)];
            case 1:
                existingService = _a.sent();
                if (existingService) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            service: null,
                        }];
                }
                return [4 /*yield*/, servicesData.createService(name, +carSegmentId, +price)];
            case 2:
                service = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        service: service,
                    }];
        }
    });
}); }; };
var getAllServices = function (servicesData) { return function (page, pageSize, priceLow, priceHigh, serviceName, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, servicesData.getAllServices(page, pageSize, priceLow, priceHigh, serviceName, carSegment)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); }; };
var getServiceById = function (servicesData) { return function (serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, servicesData.getBy("service_id", serviceId)];
            case 1:
                service = _a.sent();
                if (!service) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            service: null,
                        }];
                }
                return [2 /*return*/, {
                        error: null,
                        service: service,
                    }];
        }
    });
}); }; };
var updateService = function (servicesData) { return function (updatedServiceData, serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var existingService, updated, service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, servicesData.getBy("service_id", +serviceId)];
            case 1:
                existingService = _a.sent();
                if (!existingService) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            service: null,
                        }];
                }
                updated = __assign(__assign({}, existingService), updatedServiceData);
                return [4 /*yield*/, servicesData.update(updated, +serviceId)];
            case 2:
                service = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        service: service,
                    }];
        }
    });
}); }; };
var deleteService = function (servicesData) { return function (serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceToDelete, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, servicesData.getBy("service_id", +serviceId)];
            case 1:
                serviceToDelete = _a.sent();
                if (!serviceToDelete) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            service: null,
                        }];
                }
                return [4 /*yield*/, servicesData.remove(+serviceId)];
            case 2:
                _ = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        service: __assign(__assign({}, serviceToDelete), { isDeleted: 1 }),
                    }];
        }
    });
}); }; };
export default {
    createService: createService,
    getServiceById: getServiceById,
    getAllServices: getAllServices,
    updateService: updateService,
    deleteService: deleteService,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zZXJ2aWNlcy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFJakQsSUFBTSxhQUFhLEdBQUcsVUFBQyxZQUEwQixJQUFLLE9BQUEsVUFBTyxJQUFZLEVBQUUsS0FBYSxFQUFFLFlBQW9COzs7O29CQUNwRixxQkFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsRUFBQTs7Z0JBQXJFLGVBQWUsR0FBRyxTQUFtRDtnQkFDM0UsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCOzRCQUM5QixPQUFPLEVBQUUsSUFBSTt5QkFDZCxFQUFDO2lCQUNIO2dCQUNlLHFCQUFNLFlBQVksQ0FBQyxhQUFhLENBQzlDLElBQUksRUFDSixDQUFDLFlBQVksRUFDYixDQUFDLEtBQUssQ0FDUCxFQUFBOztnQkFKSyxPQUFPLEdBQUcsU0FJZjtnQkFFRCxzQkFBTzt3QkFDTCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLFNBQUE7cUJBQ1IsRUFBQzs7O0tBQ0gsRUFsQnFELENBa0JyRCxDQUFDO0FBRUYsSUFBTSxjQUFjLEdBQUcsVUFBQyxZQUEwQixJQUFLLE9BQUEsVUFDckQsSUFBYSxFQUNiLFFBQWlCLEVBQ2pCLFFBQWlCLEVBQ2pCLFNBQWtCLEVBQ2xCLFdBQW9CLEVBQ3BCLFVBQW1COzs7O29CQUVKLHFCQUFNLFlBQVksQ0FBQyxjQUFjLENBQzlDLElBQUksRUFDSixRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxXQUFXLEVBQ1gsVUFBVSxDQUNYLEVBQUE7O2dCQVBLLE1BQU0sR0FBRyxTQU9kO2dCQUVELHNCQUFPLE1BQU0sRUFBQzs7O0tBQ2YsRUFsQnNELENBa0J0RCxDQUFDO0FBRUYsSUFBTSxjQUFjLEdBQUcsVUFBQyxZQUEwQixJQUFLLE9BQUEsVUFBTyxTQUFpQjs7OztvQkFDN0QscUJBQU0sWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUE7O2dCQUEzRCxPQUFPLEdBQUcsU0FBaUQ7Z0JBRWpFLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1osc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLE9BQU8sRUFBRSxJQUFJO3lCQUNkLEVBQUM7aUJBQ0g7Z0JBRUQsc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsT0FBTyxTQUFBO3FCQUNSLEVBQUM7OztLQUNILEVBZHNELENBY3RELENBQUM7QUFFRixJQUFNLGFBQWEsR0FBRyxVQUFDLFlBQTBCLElBQUssT0FBQSxVQUFPLGtCQUFzQyxFQUFFLFNBQWlCOzs7O29CQUM1RixxQkFBTSxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFBOztnQkFBcEUsZUFBZSxHQUFHLFNBQWtEO2dCQUUxRSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUNwQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsT0FBTyxFQUFFLElBQUk7eUJBQ2QsRUFBQztpQkFDSDtnQkFDSyxPQUFPLHlCQUFRLGVBQWUsR0FBSyxrQkFBa0IsQ0FBRSxDQUFDO2dCQUM5QyxxQkFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFBOztnQkFBeEQsT0FBTyxHQUFHLFNBQThDO2dCQUM5RCxzQkFBTzt3QkFDTCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLFNBQUE7cUJBQ1IsRUFBQzs7O0tBQ0gsRUFmcUQsQ0FlckQsQ0FBQztBQUVGLElBQU0sYUFBYSxHQUFHLFVBQUMsWUFBMEIsSUFBSyxPQUFBLFVBQU8sU0FBaUI7Ozs7b0JBQ3BELHFCQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUE7O2dCQUFwRSxlQUFlLEdBQUcsU0FBa0Q7Z0JBRTFFLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3BCLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCOzRCQUM5QixPQUFPLEVBQUUsSUFBSTt5QkFDZCxFQUFDO2lCQUNIO2dCQUVTLHFCQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQTs7Z0JBQXpDLENBQUMsR0FBRyxTQUFxQztnQkFFL0Msc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsT0FBTyx3QkFBTyxlQUFlLEtBQUUsU0FBUyxFQUFFLENBQUMsR0FBRTtxQkFDOUMsRUFBQzs7O0tBQ0gsRUFoQnFELENBZ0JyRCxDQUFDO0FBRUYsZUFBZTtJQUNiLGFBQWEsZUFBQTtJQUNiLGNBQWMsZ0JBQUE7SUFDZCxjQUFjLGdCQUFBO0lBQ2QsYUFBYSxlQUFBO0lBQ2IsYUFBYSxlQUFBO0NBQ2QsQ0FBQyJ9