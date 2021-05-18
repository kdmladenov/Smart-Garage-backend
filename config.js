import dotenv from 'dotenv';
var config = dotenv.config().parsed;
export var DB_CONFIG = {
    host: config.HOST,
    port: config.DBPORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
};
export var PORT = config.PORT, PRIVATE_KEY = config.PRIVATE_KEY, TOKEN_LIFETIME = config.TOKEN_LIFETIME;
