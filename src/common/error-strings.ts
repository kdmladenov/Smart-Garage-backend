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

export default {
  user,
  service,
  vehicle,
};
