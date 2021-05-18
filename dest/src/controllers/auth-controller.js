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
const service_errors_js_1 = __importDefault(require("../common/service-errors.js"));
const users_service_js_1 = __importDefault(require("../services/users-service.js"));
const create_token_js_1 = __importDefault(require("../authentication/create-token.js"));
const validate_body_js_1 = __importDefault(require("../middleware/validate-body.js"));
const login_user_schema_js_1 = __importDefault(require("../validator/login-user-schema.js"));
const authMiddleware_js_1 = __importDefault(require("../authentication/authMiddleware.js"));
const errorHandler_js_1 = __importDefault(require("../middleware/errorHandler.js"));
const authController = express_1.default.Router();
authController
    .post('/login', validate_body_js_1.default('user', login_user_schema_js_1.default), errorHandler_js_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error, result } = yield users_service_js_1.default.login(users_data_js_1.default)(email, password);
    if (error === service_errors_js_1.default.INVALID_LOGIN) {
        res.status(401).send({
            message: 'Invalid email or password.',
        });
    }
    else {
        const payload = {
            userId: result.userId,
            email: result.email,
            role: result.role,
        };
        const token = create_token_js_1.default(payload);
        res.status(200).send({ token });
    }
})))
    .delete('/logout', authMiddleware_js_1.default, errorHandler_js_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.replace('Bearer ', '');
    const _ = yield users_service_js_1.default.logout(users_data_js_1.default)(token);
    res.status(200).send({
        message: 'You have logged out successfully!',
    });
})));
exports.default = authController;
