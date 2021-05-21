import { CreateVisitData } from '../models/CreateVisitData';
import { VisitsData } from '../models/VisitsData';
import errors from '../common/service-errors.js';
import { ServicesData } from '../models/ServicesData';
import { PartsData } from '../models/PartsData';

const createVisit = (visitsData: VisitsData, servicesData: ServicesData, partsData: PartsData) => async (createVisitData: CreateVisitData) => {
  const {
    notes,
    vehicleId,
    performedServices,
    usedParts,
  } = createVisitData;

  const existingServices = await Promise.all(performedServices.map(async service => {
    // console.log(service);
    const existingService = await servicesData.getServiceBy(service.name, service.carSegmentId);
    if (!existingService) {
      const createdService = await servicesData.createService(service.name, service.carSegment, service.price);
      return { ...service, serviceId: createdService.insertId };
    }
    return service;
  }));

  const existingParts = await Promise.all(usedParts.map(async part => {
    // console.log(part);
    const existingPart = await partsData.getPartBy(part.name, part.carSegmentId);
    if (!existingPart) {
      const createdPart = await partsData.createPart(part.name, part.carSegment, part.price);
      return { ...part, partId: createdPart.insertId };
    }
    return part;
  }));

  console.log(existingParts, existingServices);

  const visit = await visitsData.registerVisit(notes, vehicleId);
  const services = await visitsData.registerPerformedServices(existingServices, visit.visitId);
  const parts = await visitsData.registerUsedParts(existingParts, visit.visitId);

  return {
    error: null,
    result: visit,
  };
};

const getVisit = (visitsData: VisitsData) => async (visitId: number) => {
  const existingVisit = await visitsData.getVisitBy('visit_id', visitId);

  if (!existingVisit) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  console.log(existingVisit);

  existingVisit.performedServices = await visitsData.getPerformedServicesByVisitId(visitId);
  existingVisit.usedParts = await visitsData.getUsedPartsByVisitId(visitId);
  console.log(existingVisit);

  return {
    error: null,
    result: existingVisit,
  };
};

export default {
  createVisit,
  getVisit,
};
