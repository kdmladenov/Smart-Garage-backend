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
import partsData from "../data/parts-data.js";
import validateBody from "../middleware/validate-body.js";
import errors from "../common/service-errors.js";
import createPartSchema from "../validator/create-part-schema.js";
import { part as PART, paging } from "../common/constants.js";
import partsServices from "../services/parts-service.js";
import authMiddleware from "../authentication/authMiddleware.js";
import loggedUserGuard from "../middleware/loggedUserGuard.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import rolesEnum from "../common/roles.enum.js";
import updatePartSchema from "../validator/update-part-schema.js";
import errorHandler from "../middleware/errorHandler.js";
var partsController = express.Router();
partsController.use(authMiddleware, loggedUserGuard);
partsController
    // create part
    .post("/", roleMiddleware(rolesEnum.employee), validateBody("part", createPartSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, carSegment, _b, error, part;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, carSegment = _a.carSegment;
                return [4 /*yield*/, partsServices.createPart(partsData)(name, price, carSegment)];
            case 1:
                _b = _c.sent(), error = _b.error, part = _b.part;
                if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: "A part with name already exists.",
                    });
                }
                else {
                    res.status(201).send(part);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // get all parts - search, paging
    .get("/", errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, _a, _b, page, _c, priceLow, _d, priceHigh, partName, carSegment, validatedPageSize, part;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                pageSize = req.query.pageSize;
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.priceLow, priceLow = _c === void 0 ? PART.PART_PRICE_MIN_VALUE : _c, _d = _a.priceHigh, priceHigh = _d === void 0 ? PART.PART_PRICE_MAX_VALUE : _d, partName = _a.partName, carSegment = _a.carSegment;
                validatedPageSize = 0;
                if (pageSize && typeof +pageSize !== 'number') {
                    validatedPageSize = 0;
                }
                else if (pageSize && +pageSize <= paging.parts.MIN_PAGE_SIZE) {
                    validatedPageSize = paging.parts.MIN_PAGE_SIZE;
                }
                else if (pageSize && +pageSize >= paging.parts.MIN_PAGE_SIZE) {
                    validatedPageSize = pageSize ? +pageSize : paging.parts.MIN_PAGE_SIZE;
                }
                page = page || 1;
                partName = typeof partName === "string" ? partName : "";
                carSegment = typeof carSegment === "string" ? carSegment : "";
                priceLow = typeof priceLow === "number" ? priceLow : +priceLow || PART.PART_PRICE_MIN_VALUE;
                priceHigh = typeof priceHigh === "number" ? priceHigh : +priceHigh || PART.PART_PRICE_MAX_VALUE;
                return [4 /*yield*/, partsServices.getAllParts(partsData)(+page, validatedPageSize, +priceLow, +priceHigh, partName, carSegment)];
            case 1:
                part = _e.sent();
                res.status(200).send(part);
                return [2 /*return*/];
        }
    });
}); }))
    // get by id
    .get("/:partId", errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partId, _a, error, part;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                partId = req.params.partId;
                return [4 /*yield*/, partsServices.getPartById(partsData)(+partId)];
            case 1:
                _a = _b.sent(), error = _a.error, part = _a.part;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "A part with number ".concat(partId, " is not found!"),
                    });
                }
                else {
                    res.status(200).send(part);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // update
    .put("/:partId", roleMiddleware(rolesEnum.employee), validateBody("part", updatePartSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partId, updatedPartData, _a, error, part;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                partId = req.params.partId;
                updatedPartData = req.body;
                return [4 /*yield*/, partsServices.updatePart(partsData)(updatedPartData, +partId)];
            case 1:
                _a = _b.sent(), error = _a.error, part = _a.part;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "The part is not found.",
                    });
                }
                else {
                    res.status(200).send(part);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // delete part
    .delete("/:partId", roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partId, _a, error, part;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                partId = req.params.partId;
                return [4 /*yield*/, partsServices.deletePart(partsData)(+partId)];
            case 1:
                _a = _b.sent(), error = _a.error, part = _a.part;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "A part with id ".concat(part, " is not found!"),
                    });
                }
                else {
                    res.status(200).send(part);
                }
                return [2 /*return*/];
        }
    });
}); }));
export default partsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0cy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sU0FBUyxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLElBQUksSUFBSSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxjQUFjLE1BQU0scUNBQXFDLENBQUM7QUFDakUsT0FBTyxlQUFlLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxjQUFjLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLFlBQVksTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFekMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFckQsZUFBZTtJQUNiLGNBQWM7S0FDYixJQUFJLENBQ0gsR0FBRyxFQUNILGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQ2xDLFlBQVksQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsRUFDdEMsWUFBWSxDQUFDLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7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