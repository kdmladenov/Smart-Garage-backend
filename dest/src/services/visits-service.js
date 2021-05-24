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
import errors from '../common/service-errors.js';
import rolesEnum from '../common/roles.enum.js';
var createVisit = function (visitsData, servicesData, partsData) { return function (createVisitData) { return __awaiter(void 0, void 0, void 0, function () {
    var notes, vehicleId, performedServices, usedParts, existingServices, existingParts, visit, services, parts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                notes = createVisitData.notes, vehicleId = createVisitData.vehicleId, performedServices = createVisitData.performedServices, usedParts = createVisitData.usedParts;
                return [4 /*yield*/, Promise.all(performedServices.map(function (service) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingService, createdService;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, servicesData.getServiceBy(service.name, service.carSegmentId)];
                                case 1:
                                    existingService = _a.sent();
                                    if (!!existingService) return [3 /*break*/, 3];
                                    return [4 /*yield*/, servicesData.createService(service.name, service.carSegment, service.price)];
                                case 2:
                                    createdService = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, service), { serviceId: createdService.insertId })];
                                case 3: return [2 /*return*/, { service: service, serviceId: existingService.serviceId }];
                            }
                        });
                    }); }))];
            case 1:
                existingServices = _a.sent();
                return [4 /*yield*/, Promise.all(usedParts.map(function (part) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingPart, createdPart;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, partsData.getPartBy(part.name, part.carSegmentId)];
                                case 1:
                                    existingPart = _a.sent();
                                    if (!!existingPart) return [3 /*break*/, 3];
                                    return [4 /*yield*/, partsData.createPart(part.name, part.carSegment, part.price)];
                                case 2:
                                    createdPart = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, part), { partId: createdPart.insertId })];
                                case 3: return [2 /*return*/, { part: part, partId: existingPart.partId }];
                            }
                        });
                    }); }))];
            case 2:
                existingParts = _a.sent();
                return [4 /*yield*/, visitsData.registerVisit(notes, vehicleId)];
            case 3:
                visit = _a.sent();
                return [4 /*yield*/, visitsData.registerPerformedServices(existingServices, visit.visitId)];
            case 4:
                services = _a.sent();
                return [4 /*yield*/, visitsData.registerUsedParts(existingParts, visit.visitId)];
            case 5:
                parts = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: visit,
                    }];
        }
    });
}); }; };
var getVisit = function (visitsData) { return function (visitId) { return __awaiter(void 0, void 0, void 0, function () {
    var existingVisit, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, visitsData.getVisitBy('visit_id', visitId)];
            case 1:
                existingVisit = _c.sent();
                if (!existingVisit) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                _a = existingVisit;
                return [4 /*yield*/, visitsData.getPerformedServicesByVisitId(visitId)];
            case 2:
                _a.performedServices = _c.sent();
                _b = existingVisit;
                return [4 /*yield*/, visitsData.getUsedPartsByVisitId(visitId)];
            case 3:
                _b.usedParts = _c.sent();
                return [2 /*return*/, {
                        error: null,
                        result: existingVisit,
                    }];
        }
    });
}); }; };
var getAllVisits = function (visitsData, vehiclesData) { return function (role, loggedUserId, userId, vehicleId, visitRangeLow, visitRangeHigh, visitStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var existingVehicle, visits;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (userId !== loggedUserId && role !== rolesEnum.employee) {
                    return [2 /*return*/, {
                            error: errors.OPERATION_NOT_PERMITTED,
                            result: null,
                        }];
                }
                if (!vehicleId) return [3 /*break*/, 2];
                return [4 /*yield*/, vehiclesData.getVehicleBy('vehicle_id', vehicleId)];
            case 1:
                existingVehicle = _a.sent();
                if (!existingVehicle) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                _a.label = 2;
            case 2: return [4 /*yield*/, visitsData.getAllVisitsBy(userId, vehicleId, visitRangeLow, visitRangeHigh, visitStatus)];
            case 3:
                visits = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: visits,
                    }];
        }
    });
}); }; };
export default {
    createVisit: createVisit,
    getVisit: getVisit,
    getAllVisits: getAllVisits,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvdmlzaXRzLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUlqRCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUVoRCxJQUFNLFdBQVcsR0FBRyxVQUFDLFVBQXNCLEVBQUUsWUFBMEIsRUFBRSxTQUFvQixJQUFLLE9BQUEsVUFBTyxlQUFnQzs7Ozs7Z0JBRXJJLEtBQUssR0FJSCxlQUFlLE1BSlosRUFDTCxTQUFTLEdBR1AsZUFBZSxVQUhSLEVBQ1QsaUJBQWlCLEdBRWYsZUFBZSxrQkFGQSxFQUNqQixTQUFTLEdBQ1AsZUFBZSxVQURSLENBQ1M7Z0JBRUsscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBTSxPQUFPOzs7O3dDQUNwRCxxQkFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFBOztvQ0FBckYsZUFBZSxHQUFHLFNBQW1FO3lDQUN2RixDQUFDLGVBQWUsRUFBaEIsd0JBQWdCO29DQUNLLHFCQUFNLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQTs7b0NBQWxHLGNBQWMsR0FBRyxTQUFpRjtvQ0FDeEcsNENBQVksT0FBTyxLQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsUUFBUSxLQUFHO3dDQUU1RCxzQkFBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsU0FBUyxFQUFFLEVBQUM7Ozt5QkFDMUQsQ0FBQyxDQUFDLEVBQUE7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