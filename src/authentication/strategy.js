var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passportJwt from 'passport-jwt';
import { PRIVATE_KEY } from '../../config.js';
const options = {
    secretOrKey: PRIVATE_KEY,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtStrategy = new passportJwt.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
    };
    done(null, user);
}));
export default jwtStrategy;
