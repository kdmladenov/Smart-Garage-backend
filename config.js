import dotenv from 'dotenv';
const config = dotenv.config().parsed;
export const DB_CONFIG = {
  host: config.HOST,
  port: config.DBPORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: 1,
};
export const { PORT, PRIVATE_KEY, TOKEN_LIFETIME } = config;
