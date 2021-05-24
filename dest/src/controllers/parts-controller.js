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
var partsController = express.Router();
partsController
    // create part
    .post("/", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody("part", createPartSchema), 
// errorHandler(
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, carSegmentId, _b, error, part;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, carSegmentId = _a.carSegmentId;
                return [4 /*yield*/, partsServices.createPart(partsData)(name, price, carSegmentId)];
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
}); })
    // )
    // get all parts - search, sort, paging
    .get("/", authMiddleware, loggedUserGuard, 
// errorHandler(
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, pageSize, _c, page, _d, priceLow, _e, priceHigh, partName, carSegment, part;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.query, _b = _a.pageSize, pageSize = _b === void 0 ? paging.parts.MIN_PAGE_SIZE : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.priceLow, priceLow = _d === void 0 ? PART.PART_PRICE_MIN_VALUE : _d, _e = _a.priceHigh, priceHigh = _e === void 0 ? PART.PART_PRICE_MAX_VALUE : _e, partName = _a.partName, carSegment = _a.carSegment;
                if (pageSize < paging.parts.MIN_PAGE_SIZE)
                    pageSize = paging.parts.MIN_PAGE_SIZE;
                if (pageSize > paging.parts.MAX_PAGE_SIZE)
                    pageSize = paging.parts.MAX_PAGE_SIZE;
                page = page || 1;
                pageSize = typeof pageSize === "number" ? pageSize : +pageSize;
                partName = typeof partName === "string" ? partName : "";
                carSegment = typeof carSegment === "string" ? carSegment : "";
                priceLow = typeof priceLow === "number"
                    ? priceLow
                    : +priceLow || PART.PART_PRICE_MIN_VALUE;
                priceHigh =
                    typeof priceHigh === "number"
                        ? priceHigh
                        : +priceHigh || PART.PART_PRICE_MAX_VALUE;
                return [4 /*yield*/, partsServices.getAllParts(partsData)(+page, +pageSize, +priceLow, +priceHigh, partName, carSegment)];
            case 1:
                part = _f.sent();
                res.status(200).send(part);
                return [2 /*return*/];
        }
    });
}); })
    // )
    // get by id
    .get("/:partId", authMiddleware, loggedUserGuard, 
// errorHandler(
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                        message: "A part with number " + partId + " is not found!",
                    });
                }
                else {
                    res.status(200).send(part);
                }
                return [2 /*return*/];
        }
    });
}); })
    // )
    // update
    .put("/:partId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody("part", updatePartSchema), 
// errorHandler(
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
}); })
    // )
    // delete part
    .delete("/:partId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), 
// errorHandler(
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                        message: "A part with id " + part + " is not found!",
                    });
                }
                else {
                    res.status(200).send(part);
                }
                return [2 /*return*/];
        }
    });
}); });
// );
export default partsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0cy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBOEIsTUFBTSxTQUFTLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFDakQsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGNBQWMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLGVBQWUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLGNBQWMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLGdCQUFnQixNQUFNLG9DQUFvQyxDQUFDO0FBR2xFLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV6QyxlQUFlO0lBQ2IsY0FBYztLQUNiLElBQUksQ0FDSCxHQUFHLEVBQ0gsY0FBYyxFQUNkLGVBQWUsRUFDZixjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUNsQyxZQUFZLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDO0FBQ3RDLGdCQUFnQjtBQUNkLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7O2dCQUM1QixLQUFnQyxHQUFHLENBQUMsSUFBSSxFQUF0QyxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxZQUFZLGtCQUFB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