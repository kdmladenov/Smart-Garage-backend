export interface CreateVisitData {
  notes: string;
  vehicleId: number;
  usedParts: {[key: string]: string | number}[];
  performedServices: {[key: string]: string | number}[];
}
