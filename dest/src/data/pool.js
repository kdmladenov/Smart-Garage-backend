"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = __importDefault(require("mariadb"));
const config_js_1 = require("../../config.js");
const db = mariadb_1.default.createPool(config_js_1.DB_CONFIG);
exports.default = db;
