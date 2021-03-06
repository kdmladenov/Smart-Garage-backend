export interface VisitsData {
  registerVisit: Function;
  registerPerformedServices: Function;
  registerUsedParts: Function;
  getVisitBy: Function;
  getPerformedServicesByVisitId: Function;
  getUsedPartsByVisitId: Function;
  getAllVisitsBy: Function;
  updateVisit: Function;
  updatePerformedService: Function;
  updateUsedPart: Function;
}
