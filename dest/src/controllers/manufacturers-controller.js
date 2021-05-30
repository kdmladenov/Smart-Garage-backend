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
import authMiddleware from '../authentication/authMiddleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import rolesEnum from '../common/roles.enum.js';
import errorHandler from '../middleware/errorHandler.js';
import manufacturersData from '../data/modles-data.js';
import manufacturersService from '../services/manufacturers-service.js';
var manufacturerController = express.Router();
manufacturerController
    .get('/', authMiddleware, loggedUserGuard, roleMiddleware(rolesEnum.employee), errorHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, manufacturersService.getAllManufacturers(manufacturersData)()];
            case 1:
                result = (_a.sent()).result;
                res.status(200).send(result);
                return [2 /*return*/];
        }
    });
}); }));
export default manufacturerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFudWZhY3R1cmVycy1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL21hbnVmYWN0dXJlcnMtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sY0FBYyxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8saUJBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxvQkFBb0IsTUFBTSxzQ0FBc0MsQ0FBQztBQUV4RSxJQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoRCxzQkFBc0I7S0FDbkIsR0FBRyxDQUNGLEdBQUcsRUFDSCxjQUFjLEVBQ2QsZUFBZSxFQUNmLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQ2xDLFlBQVksQ0FBQyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7O29CQUMxQixxQkFBTSxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUE7O2dCQUE5RSxNQUFNLEdBQUssQ0FBQSxTQUFtRSxDQUFBLE9BQXhFO2dCQUVkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0tBQzlCLENBQUMsQ0FDSCxDQUFDO0FBRUosZUFBZSxzQkFBc0IsQ0FBQyJ9