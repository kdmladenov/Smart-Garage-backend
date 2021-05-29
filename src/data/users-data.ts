/* eslint-disable complexity */
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
      address_id,
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
const blacklistToken = async (token: string) => {
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
  role?: string,
) => {
  const sql = `
  SELECT 
    first_name as firstName,
    last_name as lastName,
    user_id as userId,
    phone,
    email,
    address_id as addressId,
    a.city,
    a.country,
    a.postal_code as postalCode,
    a.street_address as street
    ${role === rolesEnum.employee ? `,
    role` : ""}
  FROM users u
  LEFT JOIN addresses a USING (address_id)
  WHERE is_deleted = 0 AND ${column} = ?
`;

  const user = (await db.query(sql, [value]))[0];
  return user;
};

const updateData = async (user: User) => {
  const sql = `
    UPDATE users SET
      first_name = ?, 
      last_name = ?, 
      company_name = ?, 
      phone = ?,
      email = ?,
      role = ?
    WHERE user_id = ?
  `;

  const updated = await db.query(sql, [
    user.firstName || null,
    user.lastName || null,
    user.companyName || null,
    user.phone || null,
    user.email || null,
    user.role || null,
    user.userId,
  ]);

  const sql2 = `
    UPDATE addresses SET
      city = ?, 
      country = ?, 
      postal_code = ?, 
      street_address = ?
    WHERE address_id = ?
  `;

  const updatedAddress = await db.query(sql2, [
    user.city || null,
    user.country || null,
    user.postalCode || null,
    user.streetAddress || null,
    user.addressId,
  ]);

  return { ...updated, ...updatedAddress };
};

const updateAddress = async (address: Address) => {
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

const getAll = async (
  pageSize: number,
  page: number,
  name: string,
  email: string,
  phone: string,
  model: string,
  make: string,
  visitRangeLow: string,
  visitRangeHigh: string,
  sort: string,
  order: string,
) => {
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(order)
    ? order
    : 'asc';
  const sortedColumn = ['fullName', 'visitStartDate'].includes(sort)
    ? sort
    : 'fullName';
  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
    SELECT 
    COUNT(*) OVER () AS totalDBItems,
    u.user_id as userId,
    au.fullName,
    u.first_name as firstName,
    u.last_name as lastName,
    u.company_name as companyName,
    u.phone,
    u.email,
    a.city,
    a.country,
    a.postal_code as postalCode,
    a.street_address as street,
    v.vehicle_id as vehicleId,
    v.vin,
    v.license_plate as licensePlate,
    mo.model_id as modelId,
    mo.model_name as model,
    ma.manufacturer_name as make,
    vis.visit_id as visitId,
    vis.visit_start as visitStartDate,
    vis.visit_end as visitEndDate,
    vis.status as visitStatus
  FROM users u
  LEFT JOIN (SELECT
  concat(first_name, " ", last_name) as fullName,
  user_id
  FROM users) au USING (user_id)
  LEFT JOIN addresses a USING (address_id)
  RIGHT JOIN vehicles v USING (user_id)
  JOIN models mo USING (model_id)
  JOIN manufacturers ma USING (manufacturer_id)
  RIGHT JOIN visits vis USING (vehicle_id)
  WHERE u.is_deleted = 0
  AND au.fullName LIKE '%${name}%'
  AND u.email LIKE '%${email}%'
  AND u.phone LIKE '%${phone}%'
  AND mo.model_name LIKE '%${model}%'
  AND ma.manufacturer_name LIKE '%${make}%'
  ${visitRangeLow && visitRangeHigh ? `AND vis.visit_start BETWEEN ? AND ?` : ''}
  GROUP BY u.user_id
  ORDER BY ${sortedColumn} ${direction} 
  LIMIT ${pageSize} OFFSET ${offset}; 
  `;

  return db.query(sql, [visitRangeLow || null, visitRangeHigh || null]);
};
const getPasswordBy = async (column: string, value:string) => {
  const sql = `
    SELECT password
    FROM users
    WHERE ${column} = ?
  `;
  const result = await db.query(sql, [value]);
  return result[0];
};

const updatePassword = async (userId:number, password:string) => {
  const sql = `
  UPDATE users SET  
    password = ?
  WHERE user_id = ?
  `;

  return db.query(sql, [password, userId]);
};
export default {
  create,
  getPassword,
  remove,
  loginUser,
  blacklistToken,
  getBy,
  createAddress,
  getByEmailPhone,
  updateData,
  updateAddress,
  getAll,
  getPasswordBy,
  updatePassword,
};
