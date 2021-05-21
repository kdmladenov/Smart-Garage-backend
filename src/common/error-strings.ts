import { visit as visitErrors } from './constants.js';

export const user = {
  email: '',
  password: '',
};

export const service = {

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
