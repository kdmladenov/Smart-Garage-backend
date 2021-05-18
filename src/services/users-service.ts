import bcrypt from 'bcrypt';
import errors from '../common/service-errors.js';
import UsersData from '../models/UsersData';

// register user
const createUser = (usersData: UsersData) => async (user: { email: string, password: string, reenteredPassword: string }) => {
  if (user.password !== user.reenteredPassword) {
    return {
      error: errors.BAD_REQUEST,
      result: null,
    };
  }

  const existingUser = await usersData.getBy(user.email);

  if (existingUser) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null,
    };
  }

  const password = await bcrypt.hash(user.password, 10);

  return {
    error: null,
    result: await usersData.create({ ...user, password }),
  };
};

// delete user
const deleteUser = (usersData: UsersData) => async (userId: number) => {
  const existingUser = await usersData.getBy('user_id', userId);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  const _ = await usersData.remove(userId);

  return {
    error: null,
    result: existingUser,
  };
};

export default {
  createUser,
  deleteUser,
};
