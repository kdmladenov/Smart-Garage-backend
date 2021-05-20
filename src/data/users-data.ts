import { Address } from "../models/Address.js";
import { User } from "../models/User.js";
import db from "./pool.js";
import rolesEnum from "../common/roles.enum.js";

const createAddress = async (address: Address) => {
  const {
    city, country, postalCode, streetAddress,
  } = address;

  const sql = `
    INSERT INTO addresses (
      city,
      country,
      postal_code,
      street_address
    )
    VALUES (?, ?, ?, ?)
  `;

  const result = await db.query(sql, [
    city,
    country,
    postalCode,
    streetAddress || null,
  ]);

  const addressId = result.insertId;
  return addressId;
};

const create = async (user: User) => {
  const {
    firstName,
    lastName,
    companyName,
    phone,
    email,
    password,
    addressId,
    role,
  } = user;

  const sql = `
    INSERT INTO users (
      first_name,
      last_name,
      company_name,
      phone,
      email, 
      password,
      addresses_id,
      role
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const createdUser = await db.query(sql, [
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
    role,
  };
};

const getPassword = async (email: string) => {
  const sql = `
    SELECT password
    FROM users
    WHERE email = ?
  `;
  const result = await db.query(sql, [email]);
  return result[0];
};

const remove = async (userId: number) => {
  const sql = `
    UPDATE users SET
      is_deleted = 1
    WHERE user_id = ?
  `;

  return db.query(sql, [userId]);
};

const loginUser = async (email: string) => {
  const sql = `
    SELECT 
      email, 
      password,
      user_id as userId,
      role
    FROM users u
    WHERE u.is_deleted = 0 AND email = ?
  `;

  const result = await db.query(sql, [email]);
  return result[0];
};

// tokens table includes blacklisted tokens only
const logoutUser = async (token: string) => {
  const sql = `
    INSERT INTO tokens (
      token
    )
    VALUES( ? )
  `;
  return db.query(sql, [token]);
};

const getAddress = async (addressId: number) => {
  const sql = `
  SELECT 
    city,
    country,
    postal_code as postalCode,
    street_address as streetAddress,
    address_id as addressId
  FROM addresses
  WHERE address_id = ?
  `;
  const result = await db.query(sql, [addressId]);
  return result[0];
};

const getByEmailPhone = async (column: string, value: string | number) => {
  const sql = `
  SELECT 
    first_name as firstName,
    last_name as lastName,
    phone,
    email
  FROM users
  WHERE is_deleted = 0 AND ${column} = ?
`;

  const user = (await db.query(sql, [value]))[0];
  return user;
};
const getBy = async (
  column: string,
  value: string | number,
  isProfileOwner: boolean,
  role: string,
) => {
  const sql = `
  SELECT 
    first_name as firstName,
    last_name as lastName,
    phone,
    email,
    a.city,
    a.country,
    a.postal_code as postalCode,
    a.street_address as street
    ${role === rolesEnum.employee || isProfileOwner ? `,
    role` : ""}
  FROM users u
  LEFT JOIN addresses a USING (addresses_id)
  WHERE is_deleted = 0 AND ${column} = ?
`;

  const user = (await db.query(sql, [value]))[0];
  return user;
  // const addressId = user && +user.addressId;
  // const address = (await getAddress(addressId)) || null;

  // return {
  //   ...user,
  //   address,
  // };
};

export default {
  create,
  getPassword,
  remove,
  loginUser,
  logoutUser,
  getBy,
  createAddress,
  getByEmailPhone,
};
