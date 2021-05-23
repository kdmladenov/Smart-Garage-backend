export const user = {
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

export const paging = {
  vehicles: {
    MAX_PAGE_SIZE: 20,
    MIN_PAGE_SIZE: 10,
  },
  services: {
    MAX_PAGE_SIZE: 20,
    MIN_PAGE_SIZE: 10,
  },
  spareParts: {
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
