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
                        message: "Vehicle is not registered.",
                    });
                }
                else if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: "Vehicle with same vin or license plate already exists.",
                    });
                }
                else {
                    res.status(200).send(result);
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
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    .get('/', authMiddleware, loggedUserGuard, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, pagesize, page, email, fullName, userId, manufacturer, modelName, carSegment, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, _b = _a.pagesize, pagesize = _b === void 0 ? paging.vehicles.MIN_PAGE_SIZE : _b, page = _a.page, email = _a.email, fullName = _a.fullName, userId = _a.userId, manufacturer = _a.manufacturer, modelName = _a.modelName, carSegment = _a.carSegment;
                if (pagesize < paging.vehicles.MIN_PAGE_SIZE)
                    pagesize = paging.vehicles.MIN_PAGE_SIZE;
                if (pagesize > paging.vehicles.MAX_PAGE_SIZE)
                    pagesize = paging.vehicles.MAX_PAGE_SIZE;
                page = page || '1';
                email = typeof email === 'string' ? email : '';
                userId = typeof userId === 'string' ? userId : '';
                fullName = typeof fullName === 'string' ? fullName : '';
                fullName = fullName && fullName.replace('_', ' ');
                manufacturer = typeof manufacturer === 'string' ? manufacturer : '';
                modelName = typeof modelName === 'string' ? modelName : '';
                carSegment = typeof carSegment === 'string' ? carSegment : '';
                return [4 /*yield*/, vehiclesService.getAllVehicles(vehiclesData)(+page, +pagesize, email, fullName, +userId, manufacturer, modelName, carSegment)];
            case 1:
                result = (_c.sent()).result;
                res.status(200).send(result);
                return [2 /*return*/];
        }
    });
}); }));
export default vehiclesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZXMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92ZWhpY2xlcy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBOEIsTUFBTSxTQUFTLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sY0FBYyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sY0FBYyxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sbUJBQW1CLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUM7QUFDekQsT0FBTyxlQUFlLE1BQU0saUNBQWlDLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFFakQsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFNUMsa0JBQWtCO0tBQ2YsSUFBSSxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7OztnQkFDckssT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBRUMscUJBQU0sZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQTs7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