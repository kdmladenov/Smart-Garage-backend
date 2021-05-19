var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import errors from '../common/service-errors.js';
// login
const login = usersData => (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersData.loginUser(email);
    if (!user || !(yield bcrypt.compare(password, user.password))) {
        return {
            error: errors.INVALID_LOGIN,
            result: null,
        };
    }
    return {
        error: null,
        result: user,
    };
});
// logout
const logout = usersData => (token) => __awaiter(void 0, void 0, void 0, function* () {
    const _ = yield usersData.logoutUser(token);
});
export default {
    login,
    logout,
};
