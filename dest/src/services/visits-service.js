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
    var notes, vehicleId, performedServices, usedParts, existingServices, existingParts, visit, services, parts, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                notes = createVisitData.notes, vehicleId = createVisitData.vehicleId, performedServices = createVisitData.performedServices, usedParts = createVisitData.usedParts;
                return [4 /*yield*/, Promise.all(performedServices.map(function (s) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingService, createdService;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, servicesData.getServiceBy(s.name, s.carSegmentId)];
                                case 1:
                                    existingService = _a.sent();
                                    if (!!existingService) return [3 /*break*/, 3];
                                    return [4 /*yield*/, servicesData.createService(s.name, s.carSegmentId, s.price)];
                                case 2:
                                    createdService = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, s), { serviceId: createdService.serviceId })];
                                case 3: return [2 /*return*/, __assign(__assign({}, s), { serviceId: existingService.serviceId })];
                            }
                        });
                    }); }))];
            case 1:
                existingServices = _a.sent();
                return [4 /*yield*/, Promise.all(usedParts.map(function (p) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingPart, createdPart;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, partsData.getPartBy(p.name, p.carSegmentId)];
                                case 1:
                                    existingPart = _a.sent();
                                    if (!!existingPart) return [3 /*break*/, 3];
                                    return [4 /*yield*/, partsData.createPart(p.name, p.carSegmentId, p.price)];
                                case 2:
                                    createdPart = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, p), { partId: createdPart.partId })];
                                case 3: return [2 /*return*/, __assign(__assign({}, p), { partId: existingPart.partId })];
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
                result = __assign(__assign({}, visit), { performedServices: existingServices, usedParts: existingParts });
                return [2 /*return*/, {
                        error: null,
                        result: result,
                    }];
        }
    });
}); }; };
var getVisit = function (visitsData) { return function (visitId, userId, role) { return __awaiter(void 0, void 0, void 0, function () {
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
                if (existingVisit.userId !== userId && role !== rolesEnum.employee) {
                    return [2 /*return*/, {
                            error: errors.OPERATION_NOT_PERMITTED,
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
var updateVisit = function (visitsData, servicesData, partsData) { return function (visitId, updateVisitData) { return __awaiter(void 0, void 0, void 0, function () {
    var existingVisit, notes, performedServices, usedParts, visitEnd, status, existingServices, existingParts, updatedVisit, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, visitsData.getVisitBy('visit_id', visitId)];
            case 1:
                existingVisit = _a.sent();
                if (!existingVisit) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                notes = updateVisitData.notes, performedServices = updateVisitData.performedServices, usedParts = updateVisitData.usedParts, visitEnd = updateVisitData.visitEnd, status = updateVisitData.status;
                return [4 /*yield*/, Promise.all(performedServices.map(function (s) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingService, createdService;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, servicesData.getServiceBy(s.name, s.carSegmentId)];
                                case 1:
                                    existingService = _a.sent();
                                    if (!!existingService) return [3 /*break*/, 3];
                                    return [4 /*yield*/, servicesData.createService(s.name, s.carSegmentId, s.price)];
                                case 2:
                                    createdService = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, s), { serviceId: createdService.serviceId })];
                                case 3: return [2 /*return*/, __assign(__assign({}, s), { serviceId: existingService.serviceId })];
                            }
                        });
                    }); }))];
            case 2:
                existingServices = _a.sent();
                return [4 /*yield*/, Promise.all(usedParts.map(function (p) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingPart, createdPart;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, partsData.getPartBy(p.name, p.carSegmentId)];
                                case 1:
                                    existingPart = _a.sent();
                                    if (!!existingPart) return [3 /*break*/, 3];
                                    return [4 /*yield*/, partsData.createPart(p.name, p.carSegmentId, p.price)];
                                case 2:
                                    createdPart = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, p), { partId: createdPart.partId })];
                                case 3: return [2 /*return*/, __assign(__assign({}, p), { partId: existingPart.partId })];
                            }
                        });
                    }); }))];
            case 3:
                existingParts = _a.sent();
                return [4 /*yield*/, visitsData.updateVisit(visitId, notes, visitEnd, status)];
            case 4:
                updatedVisit = _a.sent();
                existingServices.forEach(function (s) { return __awaiter(void 0, void 0, void 0, function () {
                    var registeredServices, updatedService, newPerformedService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, visitsData.getPerformedServicesByVisitId(visitId, s.serviceId)];
                            case 1:
                                registeredServices = _a.sent();
                                if (registeredServices.length > 0) {
                                    updatedService = visitsData.updatePerformedService(visitId, s.serviceId, s.serviceQty, s.price);
                                }
                                else {
                                    newPerformedService = visitsData.registerPerformedServices([s], visitId);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                existingParts.forEach(function (p) { return __awaiter(void 0, void 0, void 0, function () {
                    var registeredParts, updateParts, newUsedPart;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, visitsData.getUsedPartsByVisitId(visitId, p.partId)];
                            case 1:
                                registeredParts = _a.sent();
                                if (registeredParts.length > 0) {
                                    updateParts = visitsData.updateUsedPart(visitId, p.partId, p.partQty, p.price);
                                }
                                else {
                                    newUsedPart = visitsData.registerUsedParts([p], visitId);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                result = {
                    notes: notes,
                    performedServices: existingServices,
                    usedParts: existingParts,
                    visitEnd: visitEnd,
                    status: status,
                };
                return [2 /*return*/, {
                        error: null,
                        result: result,
                    }];
        }
    });
}); }; };
export default {
    createVisit: createVisit,
    getVisit: getVisit,
    getAllVisits: getAllVisits,
    updateVisit: updateVisit,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvdmlzaXRzLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUlqRCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUdoRCxJQUFNLFdBQVcsR0FBRyxVQUFDLFVBQXNCLEVBQUUsWUFBMEIsRUFBRSxTQUFvQixJQUFLLE9BQUEsVUFBTyxlQUFnQzs7Ozs7Z0JBRXJJLEtBQUssR0FJSCxlQUFlLE1BSlosRUFDTCxTQUFTLEdBR1AsZUFBZSxVQUhSLEVBQ1QsaUJBQWlCLEdBRWYsZUFBZSxrQkFGQSxFQUNqQixTQUFTLEdBQ1AsZUFBZSxVQURSLENBQ1M7Z0JBRUsscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBTSxDQUFDOzs7O3dDQUM5QyxxQkFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFBOztvQ0FBekUsZUFBZSxHQUFHLFNBQXVEO3lDQUMzRSxDQUFDLGVBQWUsRUFBaEIsd0JBQWdCO29DQUNLLHFCQUFNLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQTs7b0NBQWxGLGNBQWMsR0FBRyxTQUFpRTtvQ0FDeEYsNENBQVksQ0FBQyxLQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FBUyxLQUFHO3dDQUV2RCw0Q0FBWSxDQUFDLEtBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxTQUFTLEtBQUc7Ozt5QkFDdkQsQ0FBQyxDQUFDLEVBQUE7O2dCQVBHLGdCQUFnQixH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