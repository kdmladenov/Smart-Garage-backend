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
/* eslint-disable complexity */
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
servicesController.use(authMiddleware, loggedUserGuard);
servicesController
    // create service
    .post("/", roleMiddleware(rolesEnum.employee), validateBody("service", createServiceSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
    .get("/", errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, _a, _b, page, _c, priceLow, _d, priceHigh, serviceName, carSegment, validatedPageSize, service;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                pageSize = req.query.pageSize;
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.priceLow, priceLow = _c === void 0 ? SERVICE.SERVICE_PRICE_MIN_VALUE : _c, _d = _a.priceHigh, priceHigh = _d === void 0 ? SERVICE.SERVICE_PRICE_MAX_VALUE : _d, serviceName = _a.serviceName, carSegment = _a.carSegment;
                validatedPageSize = 0;
                if (pageSize && typeof +pageSize !== 'number') {
                    validatedPageSize = 0;
                }
                else if (pageSize && +pageSize <= paging.services.MIN_PAGE_SIZE) {
                    validatedPageSize = paging.services.MIN_PAGE_SIZE;
                }
                else if (pageSize && +pageSize >= paging.services.MIN_PAGE_SIZE) {
                    validatedPageSize = pageSize ? +pageSize : paging.services.MIN_PAGE_SIZE;
                }
                page = page || 1;
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
    .get("/:serviceId", errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
    .put("/:serviceId", roleMiddleware(rolesEnum.employee), validateBody("service", updateServiceSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
    .delete("/:serviceId", roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9zZXJ2aWNlcy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sWUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sbUJBQW1CLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEUsT0FBTyxnQkFBZ0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLGNBQWMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLGVBQWUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLGNBQWMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLG1CQUFtQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBRXpELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTVDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFeEQsa0JBQWtCO0lBQ2hCLGlCQUFpQjtLQUNoQixJQUFJLENBQ0gsR0FBRyxFQUNILGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQ2xDLFlBQVksQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsRUFDNUMsWUFBWSxDQUFDLFVBQU8s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