import {
  user as USER,
} from "./constants.js";

export const user = {
  firstName: `Expected string with length in the range [${USER.MIN_FIRST_NAME_LENGTH}-${USER.MAX_FIRST_NAME_LENGTH}]`,
  lastName: `Expected string with length in the range [${USER.MIN_FIRST_NAME_LENGTH}-${USER.MAX_LAST_NAME_LENGTH}]`,
  companyName: `Expected string with length in the range [${USER.MIN_COMPANY_NAME_LENGTH}-${USER.MAX_COMPANY_NAME_LENGTH}]`,
  phone: `Expected valid phone number with 10 digits, beginning with 08`,
  email: `Expected valid e-mail`,
  city: `Expected string with length in the range [${USER.MIN_CITY_LENGTH}-${USER.MAX_CITY_LENGTH}]`,
  country: `Expected string with length in the range [${USER.MIN_COUNTRY_LENGTH}-${USER.MAX_COUNTRY_LENGTH}]`,
  postalCode: `Expected number in the range [${USER.MIN_POSTAL_CODE_VALUE}-${USER.MAX_POSTAL_CODE_VALUE}]`,
  streetAddress: `Expected string with length in the range [${USER.MIN_STREET_LENGTH}-${USER.MAX_STREET_LENGTH}]`,
  password: `Expected valid password containing letters, numbers and at least 1 uppercase`,
  reenteredPassword: `Expected valid password containing letters, numbers and at least 1 uppercase`,
  role: `Expected customer or employee role `,
};

export const service = {};

export default {
  user,
  service,
};
