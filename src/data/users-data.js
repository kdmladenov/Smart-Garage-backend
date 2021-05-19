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
// need to add more fields (first name, last name ...)
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO users (
      email, 
      password,
      role_id
    )
    VALUES (?, ?, (SELECT role_id FROM roles WHERE type = ?))
  `;
    const createdUser = yield db.query(sql, [
        user.email,
        user.password,
        user.role,
    ]);
    const result = {
        id: createdUser.insertId,
        email: user.email,
        role: user.role,
    };
    return result;
});
const getPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT password
    FROM users
    WHERE email = ?
  `;
    const result = yield db.query(sql, [email]);
    return result[0];
});
const remove = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    UPDATE users SET
      is_deleted = 1,
    WHERE user_id = ?
  `;
    return db.query(sql, [userId]);
});
const loginUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT 
      u.email as email, 
      u.password as password,
      u.user_id as userId,
      r.type as role
    FROM users u
    LEFT JOIN roles r USING (role_id)
    WHERE u.is_deleted = 0 AND email = ?
  `;
    const result = yield db.query(sql, [email]);
    return result[0];
});
// tokens table includes blacklisted tokens only
const logoutUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO tokens (
      token
    )
    VALUES( ? )
  `;
    return db.query(sql, [token]);
});
export default {
    create,
    getPassword,
    remove,
    loginUser,
    logoutUser,
};
