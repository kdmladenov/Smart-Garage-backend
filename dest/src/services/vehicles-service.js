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
var createVehicle = function (vehiclesData) { return function (createVehicleData) { return __awaiter(void 0, void 0, void 0, function () {
    var vin, licensePlate, userId, manufacturedYear, engineType, transmission, modelName, manufacturer, carSegment, vehicle, existingVehicle, existingManufacturer, newManufacturer, existingModel, newModel;
    var _a;
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
                existingVehicle = _b.sent();
                if (existingVehicle) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            result: null,
                        }];
                }
                return [4 /*yield*/, vehiclesData.getManufacturerBy('manufacturer_name', manufacturer)];
            case 2:
                existingManufacturer = _b.sent();
                if (!!existingManufacturer) return [3 /*break*/, 4];
                return [4 /*yield*/, vehiclesData.createManufacturer(manufacturer)];
            case 3:
                newManufacturer = _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, vehiclesData.getModelBy('model_name', modelName, manufacturer)];
            case 5:
                existingModel = _b.sent();
                if (!!existingModel) return [3 /*break*/, 7];
                return [4 /*yield*/, vehiclesData.createModel(modelName, manufacturer, carSegment)];
            case 6:
                newModel = _b.sent();
                vehicle.modelId = +newModel.createId;
                return [3 /*break*/, 8];
            case 7:
                vehicle.modelId = +existingModel.id;
                _b.label = 8;
            case 8:
                _a = {
                    error: null
                };
                return [4 /*yield*/, vehiclesData.create(vehicle)];
            case 9: return [2 /*return*/, (_a.result = _b.sent(),
                    _a)];
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
var getAllVehicles = function (vehiclesData) { return function (page, pagesize, email, fullName, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, vehiclesData.getAll(page, pagesize, email, fullName, userId)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZXMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy92ZWhpY2xlcy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBSWpELElBQU0sYUFBYSxHQUFHLFVBQUMsWUFBMEIsSUFBSyxPQUFBLFVBQU8saUJBQW9DOzs7Ozs7Z0JBRTdGLEdBQUcsR0FTRCxpQkFBaUIsSUFUaEIsRUFDSCxZQUFZLEdBUVYsaUJBQWlCLGFBUlAsRUFDWixNQUFNLEdBT0osaUJBQWlCLE9BUGIsRUFDTixnQkFBZ0IsR0FNZCxpQkFBaUIsaUJBTkgsRUFDaEIsVUFBVSxHQUtSLGlCQUFpQixXQUxULEVBQ1YsWUFBWSxHQUlWLGlCQUFpQixhQUpQLEVBQ1osU0FBUyxHQUdQLGlCQUFpQixVQUhWLEVBQ1QsWUFBWSxHQUVWLGlCQUFpQixhQUZQLEVBQ1osVUFBVSxHQUNSLGlCQUFpQixXQURULENBQ1U7Z0JBRWhCLE9BQU8sR0FBRztvQkFDZCxHQUFHLEtBQUE7b0JBQ0gsWUFBWSxjQUFBO29CQUNaLE1BQU0sUUFBQTtvQkFDTixnQkFBZ0Isa0JBQUE7b0JBQ2hCLFVBQVUsWUFBQTtvQkFDVixZQUFZLGNBQUE7b0JBQ1osT0FBTyxFQUFFLENBQUM7aUJBQ1gsQ0FBQztnQkFFc0IscUJBQU0sWUFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUE7O2dCQUE3RCxlQUFlLEdBQUcsU0FBMkM7Z0JBRW5FLElBQUksZUFBZSxFQUFFO29CQUNuQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsTUFBTSxFQUFFLElBQUk7eUJBQ2IsRUFBQztpQkFDSDtnQkFFNEIscUJBQU0sWUFBWSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixF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