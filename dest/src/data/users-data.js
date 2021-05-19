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
const pool_js_1 = __importDefault(require("./pool.js"));
const createAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, country, postalCode, streetAddress } = address;
    const sql = `
    INSERT INTO addresses (
      city,
      country,
      postal_code,
      street_address
    )
    VALUES (?, ?, ?, ?)
  `;
    return pool_js_1.default.query(sql, [city, country, postalCode, streetAddress]);
});
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, companyName, phone, email, password, address, role, } = user;
    const addressId = (yield createAddress(address)).insertId;
    const sql = `
    INSERT INTO users (
      first_name,
      last_name,
      company_name,
      phone,
      email, 
      password,
      address_id,
      role
    )
    VALUES (?, ?, ?)
  `;
    const createdUser = yield pool_js_1.default.query(sql, [
        firstName,
        lastName,
        companyName,
        phone,
        email,
        password,
        addressId,
        role,
    ]);
    return {
        id: createdUser.insertId,
        firstName,
        lastName,
        companyName,
        phone,
        email,
        addressId,
        address,
        role,
    };
});
const getPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT password
    FROM users
    WHERE email = ?
  `;
    const result = yield pool_js_1.default.query(sql, [email]);
    return result[0];
});
const remove = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    UPDATE users SET
      is_deleted = 1,
    WHERE user_id = ?
  `;
    return pool_js_1.default.query(sql, [userId]);
});
const loginUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT 
      email, 
      password,
      user_id as userId,
      role
    FROM users u
    WHERE u.is_deleted = 0 AND email = ?
  `;
    const result = yield pool_js_1.default.query(sql, [email]);
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
    return pool_js_1.default.query(sql, [token]);
});
const getAddress = (addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
  SELECT 
    city,
    country,
    postal_code as postalCode,
    street_address as streetAddress
  FROM addresses
  WHERE address_id = ?
  `;
    const result = yield pool_js_1.default.query(sql, [addressId]);
});
const getBy = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
  SELECT 
    first_name as firstName,
    last_name as lastName,
    company_name as companyName,
    phone,
    email, 
    password,
    address_id as addressId,
    role
  FROM users u
  WHERE u.is_deleted = 0 AND email = ?
`;
    const user = (yield pool_js_1.default.query(sql, [email]))[0];
    const addressId = +user.addressId;
    const address = yield getAddress(addressId);
    return Object.assign(Object.assign({}, user), { address });
});
exports.default = {
    create,
    getPassword,
    remove,
    loginUser,
    logoutUser,
    getBy,
};
