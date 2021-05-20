import bcrypt from 'bcrypt';
import errors from '../common/service-errors.js';
import UsersData from '../models/UsersData.js';
import UserDetailed from '../models/UserDetailed.js';

// register user
const createUser = (usersData: UsersData) => async (user: UserDetailed) => {
  if (user.password !== user.reenteredPassword) {
    return {
      error: errors.BAD_REQUEST,
      result: null,
    };
  }

  const existingUser = (await usersData.getByEmailPhone("email", user.email))
                    || (await usersData.getByEmailPhone("phone", user.phone));

  if (existingUser) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null,
    };
  }

  const {
    city, country, postalCode, streetAddress,
  } = user;

  const addressId = await usersData.createAddress({
    city,
    country,
    postalCode,
    streetAddress,
  });

  const password = await bcrypt.hash(user.password, 10);

  return {
    error: null,
    result: await usersData.create({ ...user, password, addressId }),
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

const getUser = (usersData: UsersData) => async (userId: number, isProfileOwner: boolean, role: string) => {
  const user = await usersData.getBy("user_id", userId, isProfileOwner, role);
  if (!user) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  return {
    error: null,
    result: user,
  };
};

export default {
  createUser,
  deleteUser,
  getUser,
};
