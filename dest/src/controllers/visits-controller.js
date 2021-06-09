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
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import validateBody from '../middleware/validate-body.js';
import createVisitSchema from '../validator/create-visit-schema.js';
import updateVisitSchema from '../validator/update-visit-schema.js';
import errorHandler from '../middleware/errorHandler.js';
import visitsService from '../services/visits-service.js';
import visitsData from '../data/visits-data.js';
import errors from '../common/service-errors.js';
import servicesData from '../data/services-data.js';
import partsData from '../data/parts-data.js';
import vehiclesData from '../data/vehicles-data.js';
import visitStatusEnum from '../common/visit-status.enum.js';
import { sqlDateRegex } from '../common/constants.js';
var visitsController = express.Router();
visitsController.use(authMiddleware, loggedUserGuard);
visitsController
    .post('/', roleMiddleware(rolesEnum.employee), validateBody('visit', createVisitSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var visit, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                visit = req.body;
                return [4 /*yield*/, visitsService.createVisit(visitsData, servicesData, partsData)(visit)];
            case 1:
                result = (_a.sent()).result;
                return [2 /*return*/, res.status(201).send(result)];
        }
    });
}); }))
    .get('/:visitId', errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var visitId, _a, userId, role, _b, result, error;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                visitId = req.params.visitId;
                _a = req.user, userId = _a.userId, role = _a.role;
                return [4 /*yield*/, visitsService.getVisit(visitsData)(+visitId, +userId, role)];
            case 1:
                _b = _c.sent(), result = _b.result, error = _b.error;
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
}); }))
    .get('/', errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, loggedUserId, role, _b, vehicleId, userId, _c, visitRangeLow, visitRangeHigh, visitStatus, validatedUserId, validatedVehicleId, _d, result, error;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.user, loggedUserId = _a.userId, role = _a.role;
                _b = req.query, vehicleId = _b.vehicleId, userId = _b.userId;
                _c = req.query, visitRangeLow = _c.visitRangeLow, visitRangeHigh = _c.visitRangeHigh, visitStatus = _c.visitStatus;
                visitRangeLow = (typeof visitRangeLow === 'string' && sqlDateRegex.test(visitRangeLow)) ? visitRangeLow : '';
                visitRangeHigh = (typeof visitRangeHigh === 'string' && sqlDateRegex.test(visitRangeHigh)) ? visitRangeHigh : '';
                validatedUserId = userId ? +userId : 0;
                validatedVehicleId = vehicleId ? +vehicleId : 0;
                visitStatus = (typeof visitStatus === 'string' && Object.keys(visitStatusEnum).includes(visitStatus)) ? visitStatus : '';
                return [4 /*yield*/, visitsService.getAllVisits(visitsData, vehiclesData)(role, +loggedUserId, +validatedUserId, validatedVehicleId, visitRangeLow, visitRangeHigh, visitStatus)];
            case 1:
                _d = _e.sent(), result = _d.result, error = _d.error;
                if (error === errors.OPERATION_NOT_PERMITTED) {
                    return [2 /*return*/, res.status(403).send({
                            message: "This resource is forbidden!",
                        })];
                }
                if (error === errors.RECORD_NOT_FOUND) {
                    return [2 /*return*/, res.status(404).send({
                            message: "Vehicle with id " + validatedVehicleId + " was not found!",
                        })];
                }
                return [2 /*return*/, res.status(200).send(result)];
        }
    });
}); }))
    .put('/:visitId', roleMiddleware(rolesEnum.employee), validateBody('visit', updateVisitSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var visitId, updateData, _a, result, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                visitId = req.params.visitId;
                updateData = req.body;
                return [4 /*yield*/, visitsService.updateVisit(visitsData, servicesData, partsData)(+visitId, updateData)];
            case 1:
                _a = _b.sent(), result = _a.result, error = _a.error;
                if (error === errors.RECORD_NOT_FOUND) {
                    return [2 /*return*/, res.status(404).send({
                            message: "Visit with id " + visitId + " is not found.",
                        })];
                }
                return [2 /*return*/, res.status(200).send(result)];
        }
    });
}); }));
export default visitsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdmlzaXRzLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxPQUE4QixNQUFNLFNBQVMsQ0FBQztBQUNyRCxtREFBbUQ7QUFDbkQsT0FBTyxjQUFjLE1BQU0scUNBQXFDLENBQUM7QUFDakUsT0FBTyxlQUFlLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxjQUFjLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxpQkFBaUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLGlCQUFpQixNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sYUFBYSxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sWUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sU0FBUyxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sWUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sZUFBZSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUxQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRXRELGdCQUFnQjtLQUNiLElBQUksQ0FBQyxHQUFHLEVB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