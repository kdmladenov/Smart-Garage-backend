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
const error_strings_js_1 = __importDefault(require("../common/error-strings.js"));
exports.default = (resource, scheme) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {};
    Object.keys(scheme).forEach(key => {
        if (!scheme[key](req.body[key])) {
            errors[key] = error_strings_js_1.default[resource][key];
        }
    });
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    yield next();
});