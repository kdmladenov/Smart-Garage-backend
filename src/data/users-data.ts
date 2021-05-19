import { Address } from '../models/Address.js';
import { User } from '../models/User.js';
import db from './pool.js';

const createAddress = async (address: Address) => {
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

  return db.query(sql, [city, country, postalCode, streetAddress]);
}

const create = async (user: User) => {
  const {
    firstName,
    lastName,
    companyName,
    phone,
    email, 
    password,
    address,
    role,
  } = user;

  const addressId = (await createAddress(address)).insertId;
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
    address,
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
      is_deleted = 1,
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
    street_address as streetAddress
  FROM addresses
  WHERE address_id = ?
  `
  const result = await db.query(sql, [addressId])
};

const getBy = async (email: string) => {
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

  const user = (await db.query(sql, [email]))[0];
  const addressId = +user.addressId;
  const address = await getAddress(addressId);

  return {
    ...user,
    address,
  }  
}

export default {
  create,
  getPassword,
  remove,
  loginUser,
  logoutUser,
  getBy,
};
