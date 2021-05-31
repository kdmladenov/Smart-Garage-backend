export interface UpdateVisitData {
  notes: string;
  usedParts: { partId, partQty, price, name, carSegment }[];
  performedServices: { serviceId, serviceQty, price, name, carSegment }[];
  visitEnd: string;
  status: string;
}
