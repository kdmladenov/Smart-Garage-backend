import { CreateVisitData } from '../models/CreateVisitData';
import { VisitsData } from '../models/VisitsData';
import errors from '../common/service-errors.js';
import { ServicesData } from '../models/ServicesData';
import { PartsData } from '../models/PartsData';
import { VehiclesData } from '../models/VehiclesData';
import rolesEnum from '../common/roles.enum.js';

const createVisit = (visitsData: VisitsData, servicesData: ServicesData, partsData: PartsData) => async (createVisitData: CreateVisitData) => {
  const {
    notes,
    vehicleId,
    performedServices,
    usedParts,
  } = createVisitData;

  const existingServices = await Promise.all(performedServices.map(async service => {
    const existingService = await servicesData.getServiceBy(service.name, service.carSegmentId);
    if (!existingService) {
      const createdService = await servicesData.createService(service.name, service.carSegment, service.price);
      return { ...service, serviceId: createdService.insertId };
    }
    return { service, serviceId: existingService.serviceId };
  }));

  const existingParts = await Promise.all(usedParts.map(async part => {
    const existingPart = await partsData.getPartBy(part.name, part.carSegmentId);
    if (!existingPart) {
      const createdPart = await partsData.createPart(part.name, part.carSegment, part.price);
      return { ...part, partId: createdPart.insertId };
    }
    return { part, partId: existingPart.partId };
  }));

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

  existingVisit.performedServices = await visitsData.getPerformedServicesByVisitId(visitId);
  existingVisit.usedParts = await visitsData.getUsedPartsByVisitId(visitId);

  return {
    error: null,
    result: existingVisit,
  };
};

const getAllVisits = (visitsData: VisitsData, vehiclesData: VehiclesData) => async (role: string, loggedUserId: number, userId: number, vehicleId: number, visitRangeLow: string, visitRangeHigh: string, visitStatus: string) => {
  if (userId !== loggedUserId && role !== rolesEnum.employee) {
    return {
      error: errors.OPERATION_NOT_PERMITTED,
      result: null,
    };
  }

  if (vehicleId) {
    const existingVehicle = await vehiclesData.getVehicleBy('vehicle_id', vehicleId);
    if (!existingVehicle) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null,
      };
    }
  }

  const visits = await visitsData.getAllVisitsBy(userId, vehicleId, visitRangeLow, visitRangeHigh, visitStatus);

  return {
    error: null,
    result: visits,
  };
};

export default {
  createVisit,
  getVisit,
  getAllVisits,
};
