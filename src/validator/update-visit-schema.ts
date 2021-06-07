import visitStatusEnum from '../common/visit-status.enum.js';
import { visit } from '../common/constants.js';

export default {
  notes: (value: string) => typeof value === 'string' && value.length > visit.NOTES_MIN_LENGTH && value.length < visit.NOTES_MAX_LENGTH,
  usedParts: (value: { partId: number; partQty: number; price: number }[]) => Array.isArray(value)
  && value.map((p) => (!p.partId || p.partId > 0) && p.partQty > 0 && p.price > 0).every((b) => b === true),
  performedServices: (value: { serviceId?: number; serviceQty: number; price: number }[]) => Array.isArray(value)
  && value.map((s) => (!s.serviceId || s.serviceId > 0) && s.serviceQty > 0 && s.price > 0).every((b) => b === true),
  visitEnd: (value: string) => value === null || (typeof value === 'string' && !new Date(value).toString().includes('Invalid')),
  status: (value: string) => Object.keys(visitStatusEnum).includes(value),
};
