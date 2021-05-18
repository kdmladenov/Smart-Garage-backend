"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../../config.js");
const createToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, config_js_1.PRIVATE_KEY);
    return token;
};
exports.default = createToken;
