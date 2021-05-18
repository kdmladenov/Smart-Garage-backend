import jwt from 'jsonwebtoken';
import { PRIVATE_KEY /* , TOKEN_LIFETIME */ } from '../../config.js';
var createToken = function (payload) {
    var token = jwt.sign(payload, PRIVATE_KEY);
    return token;
};
export default createToken;
