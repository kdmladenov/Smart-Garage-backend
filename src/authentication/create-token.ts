import jwt from 'jsonwebtoken';
import { PRIVATE_KEY/* , TOKEN_LIFETIME */ } from '../../config.js';

const createToken = (payload: {userId: number, email: string, role: string}) => {
  const token = jwt.sign(
    payload,
    PRIVATE_KEY,
    // { expiresIn: +TOKEN_LIFETIME },
  );

  return token;
};

export default createToken;
