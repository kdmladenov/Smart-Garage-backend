var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var createPart = function (partsData) { return function (name, price, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var existingPart, part;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, partsData.getPartBy(name, carSegment)];
            case 1:
                existingPart = _a.sent();
                if (existingPart) {
                    return [2 /*return*/, {
                            error: errors.DUPLICATE_RECORD,
                            part: null,
                        }];
                }
                return [4 /*yield*/, partsData.createPart(name, carSegment, +price)];
            case 2:
                part = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        part: part,
                    }];
        }
    });
}); }; };
var getAllParts = function (partsData) { return function (page, pageSize, priceLow, priceHigh, partName, carSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, partsData.getAllParts(page, pageSize, priceLow, priceHigh, partName, carSegment)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); }; };
var getPartById = function (partsData) { return function (partId) { return __awaiter(void 0, void 0, void 0, function () {
    var part;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, partsData.getBy("part_id", partId)];
            case 1:
                part = _a.sent();
                if (!part) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            part: null,
                        }];
                }
                return [2 /*return*/, {
                        error: null,
                        part: part,
                    }];
        }
    });
}); }; };
var updatePart = function (partsData) { return function (updatedPartData, partId) { return __awaiter(void 0, void 0, void 0, function () {
    var existingPart, updated, part;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, partsData.getBy("part_id", +partId)];
            case 1:
                existingPart = _a.sent();
                if (!existingPart) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            part: null,
                        }];
                }
                updated = __assign(__assign({}, existingPart), updatedPartData);
                return [4 /*yield*/, partsData.update(updated, +partId)];
            case 2:
                part = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        part: part,
                    }];
        }
    });
}); }; };
var deletePart = function (partsData) { return function (partId) { return __awaiter(void 0, void 0, void 0, function () {
    var partToDelete, _;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, partsData.getBy("part_id", +partId)];
            case 1:
                partToDelete = _a.sent();
                if (!partToDelete) {
                    return [2 /*return*/, {
                            error: errors.RECORD_NOT_FOUND,
                            part: null,
                        }];
                }
                return [4 /*yield*/, partsData.remove(+partId)];
            case 2:
                _ = _a.sent();
                return [2 /*return*/, {
                        error: null,
                        part: __assign(__assign({}, partToDelete), { isDeleted: 1 }),
                    }];
        }
    });
}); }; };
export default {
    createPart: createPart,
    getPartById: getPartById,
    getAllParts: getAllParts,
    updatePart: updatePart,
    deletePart: deletePart,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9wYXJ0cy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sNkJBQTZCLENBQUM7QUFJakQsSUFBTSxVQUFVLEdBQUcsVUFBQyxTQUFvQixJQUFLLE9BQUEsVUFBTyxJQUFZLEVBQUUsS0FBYSxFQUFFLFVBQWtCOzs7O29CQUM1RSxxQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBQTs7Z0JBQTFELFlBQVksR0FBRyxTQUEyQztnQkFDaEUsSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLHNCQUFPOzRCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCOzRCQUM5QixJQUFJLEVBQUUsSUFBSTt5QkFDWCxFQUFDO2lCQUNIO2dCQUNZLHFCQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBM0QsSUFBSSxHQUFHLFNBQW9EO2dCQUVqRSxzQkFBTzt3QkFDTCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLE1BQUE7cUJBQ0wsRUFBQzs7O0tBQ0gsRUFkNEMsQ0FjNUMsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHLFVBQUMsU0FBb0IsSUFBSyxPQUFBLFVBQzVDLElBQWEsRUFDYixRQUFpQixFQUNqQixRQUFpQixFQUNqQixTQUFrQixFQUNsQixRQUFpQixFQUNqQixVQUFtQjs7OztvQkFFSixxQkFBTSxTQUFTLENBQUMsV0FBVyxDQUN4QyxJQUFJLEVBQ0osUUFBUSxFQUNSLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsQ0FDWCxFQUFBOztnQkFQSyxNQUFNLEdBQUcsU0FPZDtnQkFFRCxzQkFBTyxNQUFNLEVBQUM7OztLQUNmLEVBbEI2QyxDQWtCN0MsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHLFVBQUMsU0FBb0IsSUFBSyxPQUFBLFVBQU8sTUFBYzs7OztvQkFDcEQscUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUE7O2dCQUEvQyxJQUFJLEdBQUcsU0FBd0M7Z0JBRXJELElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1Qsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLElBQUksRUFBRSxJQUFJO3lCQUNYLEVBQUM7aUJBQ0g7Z0JBRUQsc0JBQU87d0JBQ0wsS0FBSyxFQUFFLElBQUk7d0JBQ1gsSUFBSSxNQUFBO3FCQUNMLEVBQUM7OztLQUNILEVBZDZDLENBYzdDLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRyxVQUFDLFNBQW9CLElBQUssT0FBQSxVQUFPLGVBQWdDLEVBQUUsTUFBYzs7OztvQkFDN0UscUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQXhELFlBQVksR0FBRyxTQUF5QztnQkFFOUQsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDakIsc0JBQU87NEJBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7NEJBQzlCLElBQUksRUFBRSxJQUFJO3lCQUNYLEVBQUM7aUJBQ0g7Z0JBQ0ssT0FBTyx5QkFBUSxZQUFZLEdBQUssZUFBZSxDQUFFLENBQUM7Z0JBQzNDLHFCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUE7O2dCQUEvQyxJQUFJLEdBQUcsU0FBd0M7Z0JBQ3JELHNCQUFPO3dCQUNMLEtBQUssRUFBRSxJQUFJO3dCQUNYLElBQUksTUFBQTtxQkFDTCxFQUFDOzs7S0FDSCxFQWY0QyxDQWU1QyxDQUFDO0FBRUYsSUFBTSxVQUFVLEdBQUcsVUFBQyxTQUFvQixJQUFLLE9BQUEsVUFBTyxNQUFjOzs7O29CQUMzQyxxQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFBOztnQkFBeEQsWUFBWSxHQUFHLFNBQXlDO2dCQUU5RCxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNqQixzQkFBTzs0QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjs0QkFDOUIsSUFBSSxFQUFFLElBQUk7eUJBQ1gsRUFBQztpQkFDSDtnQkFFUyxxQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUE7O2dCQUFuQyxDQUFDLEdBQUcsU0FBK0I7Z0JBRXpDLHNCQUFPO3dCQUNMLEtBQUssRUFBRSxJQUFJO3dCQUNYLElBQUksd0JBQU8sWUFBWSxLQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUU7cUJBQ3hDLEVBQUM7OztLQUNILEVBaEI0QyxDQWdCNUMsQ0FBQztBQUVGLGVBQWU7SUFDYixVQUFVLFlBQUE7SUFDVixXQUFXLGFBQUE7SUFDWCxXQUFXLGFBQUE7SUFDWCxVQUFVLFlBQUE7SUFDVixVQUFVLFlBQUE7Q0FDWCxDQUFDIn0=