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
import errors from '../common/service-errors.js';
import authService from '../services/auth-service.js';
import createToken from '../authentication/create-token.js';
import validateBody from '../middleware/validate-body.js';
import loginUserSchema from '../validator/login-user-schema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import errorHandler from '../middleware/errorHandler.js';
var authController = express.Router();
authController
    .post('/login', validateBody('user', loginUserSchema), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, _b, error, result, payload, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, authService.login(usersData)(email, password)];
            case 1:
                _b = _c.sent(), error = _b.error, result = _b.result;
                if (error === errors.INVALID_LOGIN) {
                    res.status(401).send({
                        message: 'Invalid email or password.',
                    });
                }
                else {
                    payload = {
                        userId: result.userId,
                        email: result.email,
                        role: result.role,
                    };
                    token = createToken(payload);
                    res.status(200).send({ token: token });
                }
                return [2 /*return*/];
        }
    });
}); }))
    .delete('/logout', authMiddleware, errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers.authorization.replace('Bearer ', '');
                return [4 /*yield*/, authService.logout(usersData)(token)];
            case 1:
                _ = _a.sent();
                res.status(200).send({
                    message: 'You have logged out successfully!',
                });
                return [2 /*return*/];
        }
    });
}); }));
export default authController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1dGgtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sU0FBUyxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sTUFBTSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDZCQUE2QixDQUFDO0FBQ3RELE9BQU8sV0FBVyxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBR3pELElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV4QyxjQUFjO0tBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7OztnQkFDOUYsS0FBd0QsR0FBRyxDQUFDLElBQUksRUFBOUQsS0FBSyxXQUFBLEVBQUUsUUFBUSxjQUFBLENBQWdEO2dCQUM3QyxxQkFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBQTs7Z0JBQXZFLEtBQW9CLFNBQW1ELEVBQXJFLEtBQUssV0FBQSxFQUFFLE1BQU0sWUFBQTtnQkFFckIsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLGFBQWEsRUFBRTtvQkFDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLE9BQU8sRUFBRSw0QkFBNEI7cUJBQ3RDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDQyxPQUFPLEdBQUc7d0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO3dCQUNyQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7d0JBQ25CLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtxQkFDbEIsQ0FBQztvQkFDSSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVuQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQztpQkFDakM7Ozs7S0FDRixDQUFDLENBQUM7S0FFRixNQUFNLENBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQzFFLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUd0RCxxQkFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBOUMsQ0FBQyxHQUFHLFNBQTBDO2dCQUVwRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsT0FBTyxFQUFFLG1DQUFtQztpQkFDN0MsQ0FBQyxDQUFDOzs7O0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFFTixlQUFlLGNBQWMsQ0FBQyJ9
