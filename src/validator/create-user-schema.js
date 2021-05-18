import { user } from '../common/constants.js';
export default {
    email: function (value) { return user.EMAIL_REGEX.test(value); },
    password: function (value) { return user.PASSWORD_REGEX.test(value); },
    reenteredPassword: function (value) { return user.PASSWORD_REGEX.test(value); },
};
