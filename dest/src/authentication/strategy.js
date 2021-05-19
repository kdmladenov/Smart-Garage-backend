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
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_js_1 = require("../../config.js");
const options = {
    secretOrKey: config_js_1.PRIVATE_KEY,
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtStrategy = new passport_jwt_1.default.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
    };
    done(null, user);
}));
exports.default = jwtStrategy;
