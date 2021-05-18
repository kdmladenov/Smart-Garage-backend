import db from './pool.js';

// need to add more fields (first name, last name ...)
const create = async (user) => {
  const sql = `
    INSERT INTO users (
      email, 
      password,
      role_id
    )
    VALUES (?, ?, (SELECT role_id FROM roles WHERE type = ?))
  `;

  const createdUser = await db.query(sql, [
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
};

const getPassword = async (value) => {
  const sql = `
    SELECT password
    FROM users
    WHERE email = ?
  `;
  const result = await db.query(sql, [value]);
  return result[0];
};

const remove = async userId => {
  const sql = `
    UPDATE users SET
      is_deleted = 1,
    WHERE user_id = ?
  `;

  return db.query(sql, [userId]);
};

const loginUser = async email => {
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

  const result = await db.query(sql, [email]);
  return result[0];
};

// tokens table includes blacklisted tokens only
const logoutUser = async (token) => {
  const sql = `
    INSERT INTO tokens (
      token
    )
    VALUES( ? )
  `;
  return db.query(sql, [token]);
};

export default {
  create,
  getPassword,
  remove,
  loginUser,
  logoutUser,
};