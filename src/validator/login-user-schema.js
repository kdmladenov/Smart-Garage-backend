import { user } from '../common/constants.js';
export default {
    email: (value) => user.EMAIL_REGEX.test(value),
    password: (value) => user.PASSWORD_REGEX.test(value),
};
