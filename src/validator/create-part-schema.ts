import { part, carSegments } from '../common/constants.js';

export default {
  name: (value: string) => typeof value === 'string' && value.length > part.PART_NAME_MIN_LENGTH && value.length < part.PART_NAME_MAX_LENGTH,
  price: (value: number) => typeof +value === 'number' && value > part.PART_PRICE_MIN_VALUE && value < part.PART_PRICE_MAX_VALUE,
  carSegment: (value: string) => typeof value === 'string' && Object.keys(carSegments).includes(value),
};
