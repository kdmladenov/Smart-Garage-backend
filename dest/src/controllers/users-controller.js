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
import usersData from "../data/users-data.js";
import validateBody from "../middleware/validate-body.js";
import usersService from "../services/users-service.js";
import createUserSchema from "../validator/create-user-schema.js";
import authMiddleware from "../authentication/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import rolesEnum from "../common/roles.enum.js";
import errors from "../common/service-errors.js";
import loggedUserGuard from "../middleware/loggedUserGuard.js";
import errorHandler from "../middleware/errorHandler.js";
import updateUserSchema from "../validator/update-user-schema.js";
import updatePasswordSchema from "../validator/update-password-schema.js";
var usersController = express.Router();
usersController
    // register
    .post("/", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody("user", createUserSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.body;
                return [4 /*yield*/, usersService.createUser(usersData)(user)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: "The request was invalid. Passwords do not match.",
                    });
                }
                if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: "User with same email already exists.",
                    });
                }
                else {
                    res.status(201).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Delete user
    .delete("/:userId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, usersService.deleteUser(usersData)(+userId)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + userId + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Get All users
    .get("/", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, name, _c, email, _d, phone, _e, model, _f, make, _g, visitRangeLow, _h, visitRangeHigh, _j, sort, _k, order, result;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _a = req.query, _b = _a.name, name = _b === void 0 ? "" : _b, _c = _a.email, email = _c === void 0 ? "" : _c, _d = _a.phone, phone = _d === void 0 ? "" : _d, _e = _a.model, model = _e === void 0 ? "" : _e, _f = _a.make, make = _f === void 0 ? "" : _f, _g = _a.visitRangeLow, visitRangeLow = _g === void 0 ? "" : _g, _h = _a.visitRangeHigh, visitRangeHigh = _h === void 0 ? "" : _h, _j = _a.sort, sort = _j === void 0 ? "name" : _j, _k = _a.order, order = _k === void 0 ? "ASC" : _k;
                email = typeof email === "string" ? email : "";
                name = typeof name === "string" ? name : "";
                phone = typeof phone === "string" ? phone : "";
                model = typeof model === "string" ? model : "";
                make = typeof make === "string" ? make : "";
                visitRangeLow = typeof visitRangeLow === "string" ? visitRangeLow : "";
                visitRangeHigh = typeof visitRangeHigh === "string" ? visitRangeHigh : "";
                sort = typeof sort === "string" ? sort : "";
                order = typeof order === "string" ? order : "";
                return [4 /*yield*/, usersService.getAllUsers(usersData)(name, email, phone, model, make, visitRangeLow, visitRangeHigh, sort, order)];
            case 1:
                result = _l.sent();
                res.status(200).send(result);
                return [2 /*return*/];
        }
    });
}); }))
    // )
    // Get a single user
    .get("/:userId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, role, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                role = req.user.role;
                return [4 /*yield*/, usersService.getUser(usersData)(+userId, role)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + userId + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Update a single user
    .put("/:userId", authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody("user", updateUserSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, update, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.userId;
                update = req.body;
                return [4 /*yield*/, usersService.update(usersData)(update, +id)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: "The request was invalid. Emails are required or do not match.",
                    });
                }
                else if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + id + " is not found.",
                    });
                }
                else if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: "User with same email already exists.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }))
    // Change password
    .patch("/:userId/change-password", authMiddleware, loggedUserGuard, validateBody("user", updatePasswordSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role, id, passwordData, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                role = req.user.role;
                id = role === rolesEnum.employee ? req.params.userId : req.user.userId;
                passwordData = req.body;
                return [4 /*yield*/, usersService.changePassword(usersData)(passwordData, +id, role)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.BAD_REQUEST) {
                    res.status(400).send({
                        message: "The request was invalid. Passwords do not match.",
                    });
                }
                else if (error === errors.RECORD_NOT_FOUND) {
                    res.status(404).send({
                        message: "User " + id + " is not found.",
                    });
                }
                else {
                    res.status(200).send(result);
                }
                return [2 /*return*/];
        }
    });
}); }));
export default usersController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2Vycy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBOEIsTUFBTSxTQUFTLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLGNBQWMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLGNBQWMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLFlBQVksTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLGdCQUFnQixNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sb0JBQW9CLE1BQU0sd0NBQXdDLENBQUM7QUFFMUUsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXpDLGVBQWU7SUFFYixXQUFXO0tBQ1YsSUFBSSxDQUNILEdBQUcsRUFDSCxjQUFjLEVBQ2QsZUFBZSxFQUNmLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQ2xDLFlBQVksQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsRUFDdEMsWUFBWSxDQUFDLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7O2dCQUN2QyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFSSxxQkFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLFNB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