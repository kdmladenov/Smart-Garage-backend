import { user } from "../common/constants.js";

export default {
  password: (value: string): boolean => user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value: string): boolean => user.PASSWORD_REGEX.test(value),
};
