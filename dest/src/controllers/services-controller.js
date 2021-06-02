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
import express from "express";
import servicesData from "../data/services-data.js";
import validateBody from "../middleware/validate-body.js";
import errors from "../common/service-errors.js";
import createServiceSchema from "../validator/create-service-schema.js";
import { service as SERVICE, paging } from "../common/constants.js";
import servicesServices from "../services/services-service.js";
import authMiddleware from "../authentication/authMiddleware.js";
import loggedUserGuard from "../middleware/loggedUserGuard.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import rolesEnum from "../common/roles.enum.js";
import updateServiceSchema from "../validator/update-service-schema.js";
import errorHandler from "../middleware/errorHandler.js";
var servicesController = express.Router();
servicesController
    // create service
    .post("/", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody("service", createServiceSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, carSegment, _b, error, service;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, carSegment = _a.carSegment;
                return [4 /*yield*/, servicesServices.createService(servicesData)(name, price, carSegment)];
            case 1:
                _b = _c.sent(), error = _b.error, service = _b.service;
                if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: "A service with name already exists.",
                    });
                }
                else {
                    res.status(201).send(service);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // get all services - search, sort, paging
    .get("/", authMiddleware, loggedUserGuard, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, _a, _b, page, _c, priceLow, _d, priceHigh, serviceName, carSegment, validatedPageSize, service;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                pageSize = req.query.pageSize;
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.priceLow, priceLow = _c === void 0 ? SERVICE.SERVICE_PRICE_MIN_VALUE : _c, _d = _a.priceHigh, priceHigh = _d === void 0 ? SERVICE.SERVICE_PRICE_MAX_VALUE : _d, serviceName = _a.serviceName, carSegment = _a.carSegment;
                validatedPageSize = paging.services.MIN_PAGE_SIZE;
                if (pageSize && typeof +pageSize === 'number' && +pageSize < paging.services.MIN_PAGE_SIZE) {
                    validatedPageSize = paging.services.MIN_PAGE_SIZE;
                }
                else {
                    validatedPageSize = 0;
                }
                page = page || 1;
                // pageSize = typeof pageSize === "number" ? pageSize : pageSize;
                serviceName = typeof serviceName === "string" ? serviceName : "";
                carSegment = typeof carSegment === "string" ? carSegment : "";
                priceLow = typeof priceLow === "number" ? priceLow : +priceLow || SERVICE.SERVICE_PRICE_MIN_VALUE;
                priceHigh = typeof priceHigh === "number" ? priceHigh : +priceHigh || SERVICE.SERVICE_PRICE_MAX_VALUE;
                return [4 /*yield*/, servicesServices.getAllServices(servicesData)(+page, validatedPageSize, +priceLow, +priceHigh, serviceName, carSegment)];
            case 1:
                service = _e.sent();
                res.status(200).send(service);
                return [2 /*return*/];
        }
    });
}); }))
    // get by id
    .get("/:serviceId", authMiddleware, loggedUserGuard, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceId, _a, error, service;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                serviceId = req.params.serviceId;
                return [4 /*yield*/, servicesServices.getServiceById(servicesData)(+serviceId)];
            case 1:
                _a = _b.sent(), error = _a.error, service = _a.service;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "A service with number " + serviceId + " is not found!",
                    });
                }
                else {
                    res.status(200).send(service);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // update
    .put("/:serviceId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody("service", updateServiceSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceId, updatedServiceData, _a, error, service;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                serviceId = req.params.serviceId;
                updatedServiceData = req.body;
                return [4 /*yield*/, servicesServices.updateService(servicesData)(updatedServiceData, +serviceId)];
            case 1:
                _a = _b.sent(), error = _a.error, service = _a.service;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "The service is not found.",
                    });
                }
                else {
                    res.status(200).send(service);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // delete service
    .delete("/:serviceId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceId, _a, error, service;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                serviceId = req.params.serviceId;
                return [4 /*yield*/, servicesServices.deleteService(servicesData)(+serviceId)];
            case 1:
                _a = _b.sent(), error = _a.error, service = _a.service;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "A service with id " + service + " is not found!",
                    });
                }
                else {
                    res.status(200).send(service);
                }
                return [2 /*return*/];
        }
    });
}); }));
export default servicesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9zZXJ2aWNlcy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBOEIsTUFBTSxTQUFTLENBQUM7QUFDckQsT0FBTyxZQUFZLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFDakQsT0FBTyxtQkFBbUIsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxJQUFJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxPQUFPLGdCQUFnQixNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sY0FBYyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sY0FBYyxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sbUJBQW1CLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUM7QUFFekQsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFNUMsa0JBQWtCO0lBQ2hCLGlCQUFpQjtLQUNoQixJQUFJLENBQ0gsR0FBRyxFQUNILGNBQWMsRUFDZCxlQUFlLEVBQ2YsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFDbEMsWUFBWSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxFQUM1QyxZQUFZLENBQUMsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQ3ZDLEtBQThCLEdBQUcsQ0FBQyxJQUFJ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