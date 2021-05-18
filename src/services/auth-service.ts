import bcrypt from 'bcrypt';
import errors from '../common/service-errors.js';

// login
const login = usersData => async (email: string, password: string) => {
  const user = await usersData.loginUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      error: errors.INVALID_LOGIN,
      result: null,
    };
  }

  return {
    error: null,
    result: user,
  };
};

// logout
const logout = usersData => async (token: string) => {
  const _ = await usersData.logoutUser(token);
};

export default {
  login,
  logout,
};
