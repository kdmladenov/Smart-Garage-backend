import bcrypt from 'bcrypt';
import errors from '../common/service-errors.js';
import UsersData from '../models/UsersData';
import UserDetailed from '../models/UserDetailed.js';
import rolesEnum from '../common/roles.enum.js';

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

const getUser = (usersData: UsersData) => async (userId: number, role: string) => {
  const user = await usersData.getBy("user_id", userId, role);
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

// update profile
const update = (usersData: UsersData) => async (userUpdate: UserDetailed, userId: number) => {
  const { email, reenteredEmail } = userUpdate;
  if (email && email !== reenteredEmail) {
    return {
      error: errors.BAD_REQUEST,
      result: null,
    };
  }

  const existingUser = await usersData.getBy("user_id", userId, "employee");
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  if (email) {
    const user = await usersData.getBy("email", email, "employee");
    if (user && user.userId !== userId) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null,
      };
    }
  }

  const updatedUser = { ...existingUser, ...userUpdate, userId };
  const _ = await usersData.updateData(updatedUser);

  return {
    error: null,
    result: updatedUser,
  };
};

const getAllUsers = (usersData: UsersData) => async (
  name: string,
  email:string,
  phone: string,
  model: string,
  make: string,
  visitRangeLow: string,
  visitRangeHigh:string,
  sort: string,
  order:string,
) => {
  const result = await usersData.getAll(
    name,
    email,
    phone,
    model,
    make,
    visitRangeLow,
    visitRangeHigh,
    sort,
    order,
  );
  console.log(result[0], "tt");
  return result;
};
// change password
const changePassword = (usersData: UsersData) => async (passwordData:{[key: string]: string}, userId: number, role: string) => {
  const existingUser = await usersData.getBy('user_id', userId);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  const { password: savedPassword } = await usersData.getPasswordBy('user_id', userId);
  const { password, reenteredPassword, currentPassword } = passwordData;

  if (password !== reenteredPassword || (!await bcrypt.compare(currentPassword, savedPassword) && role !== rolesEnum.employee)) {
    return {
      error: errors.BAD_REQUEST,
      result: null,
    };
  }

  const updated = await bcrypt.hash(password, 10);
  const _ = await usersData.updatePassword(userId, updated);
  return {
    error: null,
    result: { message: 'The password was successfully changed' },
  };
};

export default {
  createUser,
  deleteUser,
  getUser,
  update,
  getAllUsers,
  changePassword,
};
