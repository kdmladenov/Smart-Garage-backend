"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = exports.user = void 0;
exports.user = {
    MIN_FIRSTNAME_LENGTH: 2,
    MAX_FIRSTNAME_LENGTH: 20,
    MIN_LASTNAME_LENGTH: 2,
    MAX_LASTNAME_LENGTH: 20,
    MIN_COMPANYNAME_LENGTH: 2,
    MAX_COMPANYNAME_LENGTH: 40,
    MIN_EMAIL_LENGTH: 4,
    MAX_EMAIL_LENGTH: 50,
    EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    PHONE_REGEX: /^(0[0-9]{9})$/,
    PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // letters, numbers and at least 1 uppercase
};
exports.service = {};
