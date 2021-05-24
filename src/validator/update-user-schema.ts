import { user } from "../common/constants.js";

export default {
  firstName: (value?: string): boolean => typeof value === "undefined"
    || (value.length >= user.MIN_FIRST_NAME_LENGTH && value.length <= user.MAX_FIRST_NAME_LENGTH),
  lastName: (value?: string): boolean => typeof value === "undefined"
    || (value.length >= user.MIN_FIRST_NAME_LENGTH && value.length <= user.MAX_LAST_NAME_LENGTH),
  companyName: (value?: string): boolean => typeof value === "undefined"
    || (value.length >= user.MIN_COMPANY_NAME_LENGTH && value.length <= user.MAX_COMPANY_NAME_LENGTH),
  phone: (value: string): boolean => typeof value === "undefined" || user.PHONE_REGEX.test(value),
  email: (value: string): boolean => typeof value === "undefined" || user.EMAIL_REGEX.test(value),
  city: (value: string): boolean => typeof value === "undefined"
    || (value.length >= user.MIN_CITY_LENGTH && value.length <= user.MAX_CITY_LENGTH),
  country: (value: string): boolean => typeof value === "undefined"
    || (value.length >= user.MIN_COUNTRY_LENGTH && value.length <= user.MAX_COUNTRY_LENGTH),
  postalCode: (value: number): boolean => typeof value === "undefined"
    || (value >= user.MIN_POSTAL_CODE_VALUE && value <= user.MAX_POSTAL_CODE_VALUE),
  streetAddress: (value: string): boolean => typeof value === "undefined"
    || (value.length >= user.MIN_STREET_LENGTH && value.length <= user.MAX_STREET_LENGTH),
  password: (value: string): boolean => typeof value === "undefined" || user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value: string): boolean => typeof value === "undefined" || user.PASSWORD_REGEX.test(value),
  role: (value: string): boolean => typeof value === "undefined" || user.ROLES.includes(value),
};
