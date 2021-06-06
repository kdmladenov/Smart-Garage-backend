import rolesEnum from './roles.enum.js';

export const user = {
  MIN_FIRST_NAME_LENGTH: 2,
  MAX_FIRST_NAME_LENGTH: 20,
  MIN_LAST_NAME_LENGTH: 2,
  MAX_LAST_NAME_LENGTH: 20,
  MIN_COMPANY_NAME_LENGTH: 2,
  MAX_COMPANY_NAME_LENGTH: 40,
  MIN_CITY_LENGTH: 3,
  MAX_CITY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 3,
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

export const paging = {
  users: {
    MAX_PAGE_SIZE: 20,
    MIN_PAGE_SIZE: 10,
  },
  vehicles: {
    MAX_PAGE_SIZE: 20,
    MIN_PAGE_SIZE: 10,
  },
  services: {
    MAX_PAGE_SIZE: 20,
    MIN_PAGE_SIZE: 10,
  },
  parts: {
    MAX_PAGE_SIZE: 20,
    MIN_PAGE_SIZE: 10,
  },
};

export const vehicle = {
  VIN_REGEX: /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/,
  LICENSE_PLATE_REGEX: /^[A-Z0-9]{7,8}/,
  MIN_MANUFACTURED_YEAR: 1900,
  ENGINE_TYPE: ['gasoline', 'diesel', 'electric', 'hybrid'],
  TRANSMISSION: ['manual', 'automatic'],
};

export const service = {
  SERVICE_NAME_MIN_LENGTH: 2,
  SERVICE_NAME_MAX_LENGTH: 100,
  SERVICE_PRICE_MIN_VALUE: 0.1,
  SERVICE_PRICE_MAX_VALUE: 100000,
  CAR_SEGMENT_ID_MIN_VALUE: 0,
};

export const visit = {
  NOTES_MIN_LENGTH: 10,
  NOTES_MAX_LENGTH: 255,
};

export const forgotPassword = {
  tokenExpiration: "15m",
  frontEndPort: 3000,
};

export const email = {
  emailService: "hotmail",
  emailUser: "smartgaragekd@outlook.com",
  emailPassword: "Sekretenklu4",
};

export const part = {
  PART_NAME_MIN_LENGTH: 2,
  PART_NAME_MAX_LENGTH: 100,
  PART_PRICE_MIN_VALUE: 0.1,
  PART_PRICE_MAX_VALUE: 100000,
  CAR_SEGMENT_ID_MIN_VALUE: 0,
};

export const sqlDateRegex = /^([0-9]{4}-[0-1][0-9]-[0-3][0-9])$/;

export const carSegments = {
  1: 'A - mini cars',
  2: 'B - small cars',
  3: 'C - medium cars',
  4: 'D - large cars',
  5: 'E - executive cars',
  6: 'F - luxury cars',
};
