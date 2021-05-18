"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_data_js_1 = __importDefault(require("../data/users-data.js"));
const validate_body_js_1 = __importDefault(require("../middleware/validate-body.js"));
const users_service_js_1 = __importDefault(require("../services/users-service.js"));
const create_user_schema_js_1 = __importDefault(require("../validator/create-user-schema.js"));
const authMiddleware_js_1 = __importDefault(require("../authentication/authMiddleware.js"));
const roleMiddleware_js_1 = __importDefault(require("../middleware/roleMiddleware.js"));
const roles_enum_js_1 = __importDefault(require("../common/roles.enum.js"));
const service_errors_js_1 = __importDefault(require("../common/service-errors.js"));
const loggedUserGuard_js_1 = __importDefault(require("../middleware/loggedUserGuard.js"));
const errorHandler_js_1 = __importDefault(require("../middleware/errorHandler.js"));
const usersController = express_1.default.Router();
usersController
    // register
    .post('/', authMiddleware_js_1.default, loggedUserGuard_js_1.default, roleMiddleware_js_1.default(roles_enum_js_1.default.employee), validate_body_js_1.default('user', create_user_schema_js_1.default), errorHandler_js_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const { error, result } = yield users_service_js_1.default.createUser(users_data_js_1.default)(user);
    if (error === service_errors_js_1.default.DUPLICATE_RECORD) {
        res.status(409).send({
            message: 'User with same email already exists.',
        });
    }
    else {
        res.status(201).send(result);
    }
})))
    // Delete user
    .delete('/:userId/delete', authMiddleware_js_1.default, loggedUserGuard_js_1.default, roleMiddleware_js_1.default(roles_enum_js_1.default.employee), errorHandler_js_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { error, result } = yield users_service_js_1.default.deleteUser(users_data_js_1.default)(+userId);
    if (error === service_errors_js_1.default.RECORD_NOT_FOUND) {
        res.status(404).send({
            message: `User ${userId} is not found.`,
        });
    }
    else {
        res.status(200).send(result);
    }
})));
exports.default = usersController;
