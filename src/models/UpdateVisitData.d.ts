export interface UpdateVisitData {
  notes: string;
  usedParts: { partId, partQty, price, name, carSegmentId }[];
  performedServices: { serviceId, serviceQty, price, name, carSegmentId }[];
  visitEnd: string;
  status: string;
}
