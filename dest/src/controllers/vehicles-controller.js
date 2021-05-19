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
/* eslint-disable import/no-unresolved */
import express from 'express';
import { paging } from '../common/constants.js';
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import validateBody from '../middleware/validate-body.js';
import createVehicleSchema from '../validator/create-vehicle-schema.js';
import errorHandler from '../middleware/errorHandler.js';
import vehiclesService from '../services/vehicles-service.js';
import vehiclesData from '../data/vehicles-data.js';
import errors from '../common/service-errors.js';
var vehiclesController = express.Router();
vehiclesController
    .post('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('vehicle', createVehicleSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicle, _a, result, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                vehicle = req.body;
                return [4 /*yield*/, vehiclesService.createVehicle(vehiclesData)(vehicle)];
            case 1:
                _a = _b.sent(), result = _a.result, error = _a.error;
                if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: 'Vehicle with same vin is already registered.',
                    });
                }
                else {
                    res.status(201).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    .put('/:vehicleId', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('vehicle', createVehicleSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicle, vehicleId, _a, result, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                vehicle = req.body;
                vehicleId = req.params.vehicleId;
                return [4 /*yield*/, vehiclesService.updateVehicle(vehiclesData)(vehicle, +vehicleId)];
            case 1:
                _a = _b.sent(), result = _a.result, error = _a.error;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "Vehicle with vin " + vehicle.vin + " is not registered.",
                    });
                }
                else {
                    res.status(201).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    .get('/:vehicleId', authMiddleware, loggedUserGuard, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicleId, _a, result, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                vehicleId = req.params.vehicleId;
                return [4 /*yield*/, vehiclesService.getVehicle(vehiclesData)(+vehicleId)];
            case 1:
                _a = _b.sent(), result = _a.result, error = _a.error;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "Vehicle with id " + vehicleId + " is not found.",
                    });
                }
                else {
                    res.status(201).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    .get('/', authMiddleware, loggedUserGuard, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, pagesize, page, owner, _c, result, error;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, _b = _a.pagesize, pagesize = _b === void 0 ? paging.vehicles.MIN_PAGE_SIZE : _b, page = _a.page, owner = _a.owner;
                if (pagesize > paging.vehicles.MAX_PAGE_SIZE)
                    pagesize = paging.vehicles.MAX_PAGE_SIZE;
                if (pagesize < paging.vehicles.MIN_PAGE_SIZE)
                    pagesize = paging.vehicles.MIN_PAGE_SIZE;
                page = page || '1';
                owner = typeof owner === 'string' ? owner : '';
                return [4 /*yield*/, vehiclesService.getAllVehicles(vehiclesData)(+page, +pagesize, owner)];
            case 1:
                _c = _d.sent(), result = _c.result, error = _c.error;
                res.status(201).send(result);
                return [2 /*return*/];
        }
    });
}); }));
export default vehiclesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZXMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92ZWhpY2xlcy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF5QztBQUN6QyxPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLGNBQWMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLGVBQWUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLGNBQWMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLG1CQUFtQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sWUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBRWpELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTVDLGtCQUFrQjtLQUNmLElBQUksQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxZQUFZLENBQUMsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQ3JLLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUVDLHFCQUFNLGVBQWUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsT0FB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