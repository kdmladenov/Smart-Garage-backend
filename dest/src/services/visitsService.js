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
var createVisit = function (visitsData) { return function (createVisitData) { return __awaiter(void 0, void 0, void 0, function () {
    var notes, visitStart, vehicleId, performedServices, usedParts, visit, services, parts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                notes = createVisitData.notes, visitStart = createVisitData.visitStart, vehicleId = createVisitData.vehicleId, performedServices = createVisitData.performedServices, usedParts = createVisitData.usedParts;
                return [4 /*yield*/, visitsData.registerVisit(notes, visitStart, vehicleId)];
            case 1:
                visit = _a.sent();
                return [4 /*yield*/, visitsData.registerPerformedServices(performedServices, visit.visitId)];
            case 2:
                services = _a.sent();
                return [4 /*yield*/, visitsData.registerUsedParts(usedParts, visit.visitId)];
            case 3:
                parts = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        result: visit,
                    }];
        }
    });
}); }; };
export default {
    createVisit: createVisit,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRzU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy92aXNpdHNTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLElBQU0sV0FBVyxHQUFHLFVBQUMsVUFBc0IsSUFBSyxPQUFBLFVBQU8sZUFBZ0M7Ozs7O2dCQUVuRixLQUFLLEdBS0gsZUFBZSxNQUxaLEVBQ0wsVUFBVSxHQUlSLGVBQWUsV0FKUCxFQUNWLFNBQVMsR0FHUCxlQUFlLFVBSFIsRUFDVCxpQkFBaUIsR0FFZixlQUFlLGtCQUZBLEVBQ2pCLFNBQVMsR0FDUCxlQUFlLFVBRFIsQ0FDUztnQkFFTixxQkFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUE7O2dCQUFwRSxLQUFLLEdBQUcsU0FBNEQ7Z0JBQ3pELHFCQUFNLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUE7O2dCQUF2RixRQUFRLEdBQUcsU0FBNEU7Z0JBQy9FLHFCQUFNLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFBOztnQkFBcEUsS0FBSyxHQUFHLFNBQTREO2dCQUUxRSxzQkFBTzt3QkFDTCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxNQUFNLEVBQUUsS0FBSztxQkFDZCxFQUFDOzs7S0FDSCxFQWpCK0MsQ0FpQi9DLENBQUM7QUFFRixlQUFlO0lBQ2IsV0FBVyxhQUFBO0NBQ1osQ0FBQyJ9