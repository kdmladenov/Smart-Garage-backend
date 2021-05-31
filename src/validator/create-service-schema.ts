import { service, carSegments } from '../common/constants.js';

export default {
  name: (value: string) => typeof value === 'string' && value.length > service.SERVICE_NAME_MIN_LENGTH && value.length < service.SERVICE_NAME_MAX_LENGTH,
  price: (value: number) => typeof +value === 'number' && value > service.SERVICE_PRICE_MIN_VALUE && value < service.SERVICE_PRICE_MAX_VALUE,
  carSegment: (value: string) => typeof value === 'string' && Object.keys(carSegments).includes(value),
};
