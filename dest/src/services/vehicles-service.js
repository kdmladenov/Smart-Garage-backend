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
var createVehicle = function (vehiclesData) { return function (createVehicleData) { return __awaiter(void 0, void 0, void 0, function () {
    var vin, licensePlate, userId, manufacturedYear, engineType, transmission, modelName, manufacturer, carSegment, vehicle, existingVehicle, _a, existingManufacturer, newManufacturer, existingModel, newModel, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                vin = createVehicleData.vin, licensePlate = createVehicleData.licensePlate, userId = createVehicleData.userId, manufacturedYear = createVehicleData.manufacturedYear, engineType = createVehicleData.engineType, transmission = createVehicleData.transmission, modelName = createVehicleData.modelName, manufacturer = createVehicleData.manufacturer, carSegment = createVehicleData.carSegment;
                vehicle = {
                    vin: vin,
                    licensePlate: licensePlate,
                    userId: userId,
                    manufacturedYear: manufacturedYear,
                    engineType: engineType,
                    transmission: transmission,
                    modelId: 0,
                };
                return [4 /*yield*/, vehiclesData.getVehicleBy('vin', vin)];
            case 1:
                _a = (_b.sent());
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, vehiclesData.getVehicleBy('license_plate', licensePlate)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                existingVehicle = _a;
                if (existingVehicle) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                return [4 /*yield*/, vehiclesData.getManufacturerBy('manufacturer_name', manufacturer)];
            case 4:
                existingManufacturer = _b.sent();
                if (!!existingManufacturer) return [3 /*break*/, 6];
                return [4 /*yield*/, vehiclesData.createManufacturer(manufacturer)];
            case 5:
                newManufacturer = _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, vehiclesData.getModelBy('model_name', modelName, manufacturer)];
            case 7:
                existingModel = _b.sent();
                if (!!existingModel) return [3 /*break*/, 9];
                return [4 /*yield*/, vehiclesData.createModel(modelName, manufacturer, carSegment)];
            case 8:
                newModel = _b.sent();
                vehicle.modelId = +newModel.insertId;
                return [3 /*break*/, 10];
            case 9:
                vehicle.modelId = +existingModel.id;
                _b.label = 10;
            case 10: return [4 /*yield*/, vehiclesData.create(vehicle)];
            case 11:
                result = _b.sent();
                return [2 /*return*/, {
                        error: null,
                        result: __assign(__assign({}, result), { manufacturer: manufacturer, carSegment: carSegment }),
                    }];
        }
    });
}); }; };
var updateVehicle = function (vehiclesData) { return function (updateVehicleData, vehicleId) { return __awaiter(void 0, void 0, void 0, function () {
    var vin, licensePlate, userId, manufacturedYear, engineType, transmission, modelName, manufacturer, carSegment, vehicle, existingVehicle, vehicleByVin, vehicleByLicensePlate, existingManufacturer, newManufacturer, existingModel, newModel;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                vin = updateVehicleData.vin, licensePlate = updateVehicleData.licensePlate, userId = updateVehicleData.userId, manufacturedYear = updateVehicleData.manufacturedYear, engineType = updateVehicleData.engineType, transmission = updateVehicleData.transmission, modelName = updateVehicleData.modelName, manufacturer = updateVehicleData.manufacturer, carSegment = updateVehicleData.carSegment;
                vehicle = {
                    vin: vin,
                    licensePlate: licensePlate,
                    userId: userId,
                    manufacturedYear: manufacturedYear,
                    engineType: engineType,
                    transmission: transmission,
                    vehicleId: vehicleId,
                    modelId: 0,
                };
                return [4 /*yield*/, vehiclesData.getVehicleBy('vehicle_id', vehicleId)];
            case 1:
                existingVehicle = _b.sent();
                if (!existingVehicle) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                if (!vin) return [3 /*break*/, 3];
                return [4 /*yield*/, vehiclesData.getVehicleBy('vin', vin)];
            case 2:
                vehicleByVin = _b.sent();
                if (vehicleByVin && vehicleByVin.vehicleId !== vehicleId) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                _b.label = 3;
            case 3:
                if (!licensePlate) return [3 /*break*/, 5];
                return [4 /*yield*/, vehiclesData.getVehicleBy('license_plate', licensePlate)];
            case 4:
                vehicleByLicensePlate = _b.sent();
                if (vehicleByLicensePlate && vehicleByLicensePlate.vehicleId !== vehicleId) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                _b.label = 5;
            case 5: return [4 /*yield*/, vehiclesData.getManufacturerBy('manufacturer_name', manufacturer)];
            case 6:
                existingManufacturer = _b.sent();
                if (!!existingManufacturer) return [3 /*break*/, 8];
                return [4 /*yield*/, vehiclesData.createManufacturer(manufacturer)];
            case 7:
                newManufacturer = _b.sent();
                _b.label = 8;
            case 8: return [4 /*yield*/, vehiclesData.getModelBy('model_name', modelName, manufacturer)];
            case 9:
                existingModel = _b.sent();
                if (!!existingModel) return [3 /*break*/, 11];
                return [4 /*yield*/, vehiclesData.createModel(modelName, manufacturer, carSegment)];
            case 10:
                newModel = _b.sent();
                vehicle.modelId = +newModel.insertId;
                return [3 /*break*/, 12];
            case 11:
                vehicle.modelId = +existingModel.id;
                _b.label = 12;
            case 12:
                _a = {
                    error: null
                };
                return [4 /*yield*/, vehiclesData.update(vehicle)];
            case 13: return [2 /*return*/, (_a.result = _b.sent(),
                    _a)];
        }
    });
}); }; };
var getVehicle = function (vehiclesData) { return function (vehicleId) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, vehiclesData.getVehicleBy('vehicle_id', vehicleId)];
            case 1:
                vehicle = _a.sent();
                if (!vehicle) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            result: null,
                        }];
                }
                return [2 /*return*/, {
                        error: null,
                        result: vehicle,
                    }];
        }
    });
}); }; };
var getAllVehicles = function (vehiclesData) { return function (page, pagesize, email, fullName, userId, manufacturer, modelName, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, vehiclesData.getAll(page, pagesize, email, fullName, userId, manufacturer, modelName, carSegment)];
            case 1:
                vehicles = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: vehicles,
                    }];
        }
    });
}); }; };
export default {
    createVehicle: createVehicle,
    updateVehicle: updateVehicle,
    getVehicle: getVehicle,
    getAllVehicles: getAllVehicles,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZXMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy92ZWhpY2xlcy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFJakQsSUFBTSxhQUFhLEdBQUcsVUFBQyxZQUEwQixJQUFLLE9BQUEsVUFBTyxpQkFBb0M7Ozs7O2dCQUU3RixHQUFHLEdBQ0QsaUJBQWlCLElBRGhCLEVBQUUsWUFBWSxHQUNmLGlCQUFpQixhQURGLEVBQUUsTUFBTSxHQUN2QixpQkFBaUIsT0FETSxFQUFFLGdCQUFnQixHQUN6QyxpQkFBaUIsaUJBRHdCLEVBQUUsVUFBVSxHQUNyRCxpQkFBaUIsV0FEb0MsRUFBRSxZQUFZLEdBQ25FLGlCQUFpQixhQURrRCxFQUFFLFNBQVMsR0FDOUUsaUJBQWlCLFVBRDZELEVBQUUsWUFBWSxHQUM1RixpQkFBaUIsYUFEMkUsRUFBRSxVQUFVLEdBQ3hHLGlCQUFpQixXQUR1RixDQUN0RjtnQkFFaEIsT0FBTyxHQUFHO29CQUNkLEdBQUcsS0FBQTtvQkFDSCxZQUFZLGNBQUE7b0JBQ1osTUFBTSxRQUFBO29CQUNOLGdCQUFnQixrQkFBQTtvQkFDaEIsVUFBVSxZQUFBO29CQUNWLFlBQVksY0FBQTtvQkFDWixPQUFPLEVBQUUsQ0FBQztpQkFDWCxDQUFDO2dCQUVzQixxQkFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBQTs7c0JBQTNDLFNBQTJDOztnQkFDMUMscUJBQU0sWUFBWSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUE7O3NCQUE5RCxTQUE4RDs7O2dCQURqRixlQUFlLEtBQ2tFO2dCQUV2RixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsc0JBQU87NEJBQ0wsS0FB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