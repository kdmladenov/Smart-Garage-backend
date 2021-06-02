export interface UpdateVisitData {
  notes: string;
  usedParts: { partId, partQty, price, name }[];
  performedServices: { serviceId, serviceQty, price, name }[];
  visitEnd: string;
  status: string;
  carSegment: string
}
