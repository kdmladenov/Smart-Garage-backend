import dotenv from 'dotenv';
import { PoolConfig } from 'mariadb';

const config = dotenv.config().parsed!;

export const DB_CONFIG: PoolConfig = {
  host: config.HOST,
  port: +config.DBPORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: +config.LIMIT,
};

export const {
  PORT,
  PRIVATE_KEY,
  TOKEN_LIFETIME,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = config;

// export const {
//   emailService: "hotmail",
//   emailUser: "smartgaragekd@outlook.com",
//   emailPassword: "Sekretenklu4",
// };
