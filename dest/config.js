"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_LIFETIME = exports.PRIVATE_KEY = exports.PORT = exports.DB_CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config = dotenv_1.default.config().parsed;
exports.DB_CONFIG = {
    host: config.HOST,
    port: config.DBPORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
};
exports.PORT = config.PORT, exports.PRIVATE_KEY = config.PRIVATE_KEY, exports.TOKEN_LIFETIME = config.TOKEN_LIFETIME;
