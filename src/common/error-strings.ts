import { user as USER, visit as visitErrors, service as serviceConstants } from './constants.js';

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

export const service = {
  name: `Expected a string with length in the range [${serviceConstants.SERVICE_NAME_MIN_LENGTH}:${serviceConstants.SERVICE_NAME_MAX_LENGTH}]`,
  price: `Expected a number with value in the range [${serviceConstants.SERVICE_PRICE_MIN_VALUE}:${serviceConstants.SERVICE_PRICE_MAX_VALUE}]`,
  carSegmentId: 'Expected a positive number',
};

export const vehicle = {
  vin: 'Enter valid VIN number',
  licensePlate: 'Enter valid license plate number',
  userId: 'Enter valid user ID',
  manufacturedYear: 'Enter valid year later than 1900',
  engineType: 'Expected one of "gasoline", "diesel", "electric", "hybrid"',
  transmission: 'Expected one of "manual", "automatic"',
  modelName: 'Expected a string',
  manufacturer: 'Expected a string',
  carSegment: 'Expected a string',
};

export const visit = {
  notes: `Expected a string in range ${visitErrors.NOTES_MIN_LENGTH} and ${visitErrors.NOTES_MAX_LENGTH} characters`,
  vehicleId: 'Expected a number.',
  usedParts: 'Expected an array of objects with values of type number and greater than zero.',
  performedServices: 'Expected an array of objects with values of type number and greater than zero.',
};

export default {
  user,
  service,
  vehicle,
  visit,
};
