import { vehicle } from '../common/constants.js';

export default {
  vin: (value: string) => vehicle.VIN_REGEX.test(value),
  licensePlate: (value: string) => vehicle.LICENSE_PLATE_REGEX.test(value),
  userId: (value: number) => typeof +value === 'number',
  manufacturedYear: (value: number) => value > vehicle.MIN_MANUFACTURED_YEAR && value <= new Date().getFullYear(),
  engineType: (value: string) => vehicle.ENGINE_TYPE.includes(value),
  transmission: (value: string) => vehicle.TRANSMISSION.includes(value),
  modelName: (value: string) => typeof value === 'string',
  manufacturer: (value: string) => typeof value === 'string',
  carSegment: (value: string) => typeof value === 'string',
};
