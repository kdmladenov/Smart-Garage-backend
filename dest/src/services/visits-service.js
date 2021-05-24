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
                return [4 /*yield*/, Promise.all(performedServices.map(function (s) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingService, createdService;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, servicesData.getServiceBy(s.name, s.carSegmentId)];
                                case 1:
                                    existingService = _a.sent();
                                    if (!!existingService) return [3 /*break*/, 3];
                                    return [4 /*yield*/, servicesData.createService(s.name, s.carSegment, s.price)];
                                case 2:
                                    createdService = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, s), { serviceId: createdService.insertId })];
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
                                    return [4 /*yield*/, partsData.createPart(p.name, p.carSegment, p.price)];
                                case 2:
                                    createdPart = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, p), { partId: createdPart.insertId })];
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
                return [2 /*return*/, {
                        error: null,
                        result: visit,
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
    var existingVisit, notes, performedServices, usedParts, visitEnd, status, existingServices, existingParts, updatedVisit;
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
                                    return [2 /*return*/, __assign(__assign({}, s), { serviceId: createdService.insertId })];
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
                                    console.log(existingPart);
                                    if (!!existingPart) return [3 /*break*/, 3];
                                    return [4 /*yield*/, partsData.createPart(p.name, p.carSegmentId, p.price)];
                                case 2:
                                    createdPart = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, p), { partId: createdPart.insertId })];
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
                                    newPerformedService = visitsData.registerPerformedServices([s]);
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
                                    newUsedPart = visitsData.registerUsedParts([p]);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, {
                        error: null,
                        result: updateVisitData,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvdmlzaXRzLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUlqRCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUdoRCxJQUFNLFdBQVcsR0FBRyxVQUFDLFVBQXNCLEVBQUUsWUFBMEIsRUFBRSxTQUFvQixJQUFLLE9BQUEsVUFBTyxlQUFnQzs7Ozs7Z0JBRXJJLEtBQUssR0FJSCxlQUFlLE1BSlosRUFDTCxTQUFTLEdBR1AsZUFBZSxVQUhSLEVBQ1QsaUJBQWlCLEdBRWYsZUFBZSxrQkFGQSxFQUNqQixTQUFTLEdBQ1AsZUFBZSxVQURSLENBQ1M7Z0JBRUsscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBTSxDQUFDOzs7O3dDQUM5QyxxQkFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFBOztvQ0FBekUsZUFBZSxHQUFHLFNBQXVEO3lDQUMzRSxDQUFDLGVBQWUsRUFBaEIsd0JBQWdCO29DQUNLLHFCQUFNLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQTs7b0NBQWhGLGNBQWMsR0FBRyxTQUErRDtvQ0FDdEYsNENBQVksQ0FBQyxLQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsUUFBUSxLQUFHO3dDQUV0RCw0Q0FBWSxDQUFDLEtBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxTQUFTLEtBQUc7Ozt5QkFDdkQsQ0FBQyxDQUFDLEVBQUE7O2dCQVBHLGdCQUFnQixH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