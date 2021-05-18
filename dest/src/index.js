"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const users_controller_js_1 = __importDefault(require("./controllers/users-controller.js"));
const config_js_1 = require("../config.js");
const auth_controller_js_1 = __importDefault(require("./controllers/auth-controller.js"));
const strategy_js_1 = __importDefault(require("./authentication/strategy.js"));
const app = express_1.default();
passport_1.default.use(strategy_js_1.default);
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/auth', auth_controller_js_1.default);
app.use('/users', users_controller_js_1.default);
app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message,
    });
});
app.listen(config_js_1.PORT, () => console.log(`Listening on port ${config_js_1.PORT}...`));
