// import dotenv from 'dotenv';
import { PoolConfig } from 'mariadb';

// const config = dotenv.config().parsed!;
const config = {
  PORT: '5555',
  HOST: 'bkfyhkzemx2bdsdphqbq-mysql.services.clever-cloud.com',
  DBPORT: '3306',
  USER: 'uvmgjjeyvrxwdg6c',
  PASSWORD: '1O5GHe7472OE381TnpO5',
  DATABASE: 'bkfyhkzemx2bdsdphqbq',
  PRIVATE_KEY: 'sekreten_chasten_klu4',
  TOKEN_LIFETIME: '360000',
  LIMIT: 3,
  EMAIL_SERVICE: 'hotmail',
  EMAIL_USER: 'smartgaragekd@outlook.com',
  EMAIL_PASSWORD: 'BestSuperSekretenklu4'
};

export const DB_CONFIG: PoolConfig = {
  host: config.HOST,
  port: +config.DBPORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: +config.LIMIT,
  allowPublicKeyRetrieval: true,
};

export const {
  PORT,
  PRIVATE_KEY,
  TOKEN_LIFETIME,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = config;
