// const config = dotenv.config().parsed!;
var config = {
    PORT: '5555',
    HOST: 'biu7miln0nxwx4bnoqvy-mysql.services.clever-cloud.com',
    DBPORT: '3306',
    USER: 'upwiahqjnuvunzui',
    PASSWORD: '2uK9CLjc0z7dfxaBiWwe',
    DATABASE: 'biu7miln0nxwx4bnoqvy',
    PRIVATE_KEY: 'sekreten_chasten_klu4',
    TOKEN_LIFETIME: '360000',
    LIMIT: 3,
    EMAIL_SERVICE: 'hotmail',
    EMAIL_USER: 'smartgaragekd@outlook.com',
    EMAIL_PASSWORD: 'BestSuperSekretenklu4',
};
export var DB_CONFIG = {
    host: config.HOST,
    port: +config.DBPORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
    connectionLimit: +config.LIMIT,
    allowPublicKeyRetrieval: true,
};
export var PORT = config.PORT, PRIVATE_KEY = config.PRIVATE_KEY, TOKEN_LIFETIME = config.TOKEN_LIFETIME, EMAIL_SERVICE = config.EMAIL_SERVICE, EMAIL_USER = config.EMAIL_USER, EMAIL_PASSWORD = config.EMAIL_PASSWORD;
