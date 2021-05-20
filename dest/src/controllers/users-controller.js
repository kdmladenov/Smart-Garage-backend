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
import usersData from '../data/users-data.js';
import validateBody from '../middleware/validate-body.js';
import usersService from '../services/users-service.js';
import createUserSchema from '../validator/create-user-schema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import errors from '../common/service-errors.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';
var usersController = express.Router();
usersController
    // register
    .post('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), validateBody('user', createUserSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, error, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.body;
                return [4 /*yield*/, usersService.createUser(usersData)(user)];
            case 1:
                _a = _b.sent(), error = _a.error, result = _a.result;
                if (error === errors.DUPLICATE_RECORD) {
                    res.status(409).send({
                        message: 'User with same email already exists.',
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
    .delete('/:userId/delete', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
}); }));
export default usersController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2Vycy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBOEIsTUFBTSxTQUFTLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxnQkFBZ0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLGNBQWMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLGNBQWMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLFlBQVksTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFekMsZUFBZTtJQUViLFdBQVc7S0FDVixJQUFJLENBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLEVBQUUsWUFBWSxDQUFDLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7O2dCQUMvSixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFSSxxQkFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFBbEUsS0FBb0IsU0FBOEMsRUFBaEUsS0FBSyxXQUFBLEVBQUUsTUFBTSxZQUFBO2dCQUVyQixJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3JDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNuQixPQUFPLEVBQUUsc0NBQXNDO3FCQUNoRCxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlCOzs7O0tBQ0YsQ0FBQyxDQUFDO0lBRUgsY0FBYztLQUNiLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxDQUFDLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7O2dCQUNySSxNQUFNLEdBQUssR0FBRyxDQUFDLE1BQU0sT0FBZixDQUFnQjtnQkFDSixxQkFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUE7O2dCQUFyRSxLQUFvQixTQUFpRCxFQUFuRSxLQUFLLFdBQUEsRUFBRSxNQUFNLFlBQUE7Z0JBRXJCLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDckMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLE9BQU8sRUFBRSxVQUFRLE1BQU0sbUJBQWdCO3FCQUN4QyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlCOzs7O0tBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFTixlQUFlLGVBQWUsQ0FBQyJ9