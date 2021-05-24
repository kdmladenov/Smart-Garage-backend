import { user } from "../common/constants.js";

export default {
  email: (value: string): boolean => user.EMAIL_REGEX.test(value),
};
