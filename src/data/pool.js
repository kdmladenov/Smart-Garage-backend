import mariadb from 'mariadb';
import { DB_CONFIG } from '../../config.js';
var db = mariadb.createPool(DB_CONFIG);
export default db;
