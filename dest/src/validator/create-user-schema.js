"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../common/constants.js");
exports.default = {
    email: (value) => constants_js_1.user.EMAIL_REGEX.test(value),
    password: (value) => constants_js_1.user.PASSWORD_REGEX.test(value),
    reenteredPassword: (value) => constants_js_1.user.PASSWORD_REGEX.test(value),
};
