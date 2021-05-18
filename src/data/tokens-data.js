var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from './pool.js';
const tokenExists = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT *
    FROM tokens
    WHERE token = ?
  `;
    const result = yield db.query(sql, [token]);
    return result && result.length > 0;
});
export default tokenExists;
