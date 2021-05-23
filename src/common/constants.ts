import rolesEnum from './roles.enum.js';

export const user = {
  MIN_FIRST_NAME_LENGTH: 2,
  MAX_FIRST_NAME_LENGTH: 20,
  MIN_LAST_NAME_LENGTH: 2,
  MAX_LAST_NAME_LENGTH: 20,
  MIN_COMPANY_NAME_LENGTH: 2,
  MAX_COMPANY_NAME_LENGTH: 40,
  MIN_CITY_LENGTH: 4,
  MAX_CITY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 4,
  MAX_COUNTRY_LENGTH: 50,
  MIN_POSTAL_CODE_VALUE: 100,
  MAX_POSTAL_CODE_VALUE: 9999,
  MAX_EMAIL_LENGTH: 50,
  MIN_STREET_LENGTH: 4,
  MAX_STREET_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^(08[0-9]{8})$/,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // letters, numbers and at least 1 uppercase
  ROLES: [rolesEnum.customer, rolesEnum.employee],
};
export const service = {

};
export const forgotPassword = {
  tokenExpiration: "15m",
  emailService: "hotmail",
  emailUser: "smartgaragekd@outlook.com",
  emailPassword: "Sekretenklu4",
  frontEndPort: 3000,
};
