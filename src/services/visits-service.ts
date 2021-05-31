import { CreateVisitData } from '../models/CreateVisitData';
import { VisitsData } from '../models/VisitsData';
import errors from '../common/service-errors.js';
import { ServicesData } from '../models/ServicesData';
import { PartsData } from '../models/PartsData';
import { VehiclesData } from '../models/VehiclesData';
import rolesEnum from '../common/roles.enum.js';
import { UpdateVisitData } from '../models/UpdateVisitData';

const createVisit = (visitsData: VisitsData, servicesData: ServicesData, partsData: PartsData) => async (createVisitData: CreateVisitData) => {
  const {
    notes,
    vehicleId,
    performedServices,
    usedParts,
  } = createVisitData;

  const existingServices = await Promise.all(performedServices.map(async s => {
    // getServiceBy to be changed (takes carSegment, not carSegmentId)
    const existingService = await servicesData.getServiceBy(
      s.name,
      s.carSegmentId,
    );
    if (!existingService) {
      const createdService = await servicesData.createService(
        s.name,
        s.carSegmentId,
        s.price,
      );
      return { ...s, serviceId: createdService.serviceId };
    }
    return { ...s, serviceId: existingService.serviceId };
  }));

  const existingParts = await Promise.all(usedParts.map(async p => {
    // getPartBy to be changed (takes carSegment, not carSegmentId)
    const existingPart = await partsData.getPartBy(p.name, p.carSegmentId);
    if (!existingPart) {
      const createdPart = await partsData.createPart(
        p.name,
        p.carSegmentId,
        p.price,
      );
      return { ...p, partId: createdPart.partId };
    }
    return { ...p, partId: existingPart.partId };
  }));

  const visit = await visitsData.registerVisit(notes, vehicleId);
  const services = await visitsData.registerPerformedServices(existingServices, visit.visitId);
  const parts = await visitsData.registerUsedParts(existingParts, visit.visitId);

  const result = {
    ...visit,
    performedServices: existingServices,
    usedParts: existingParts,
  };

  return {
    error: null,
    result,
  };
};

const getVisit = (visitsData: VisitsData) => async (visitId: number, userId: number, role: string) => {
  const existingVisit = await visitsData.getVisitBy('visit_id', visitId);

  if (!existingVisit) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  if (existingVisit.userId !== userId && role !== rolesEnum.employee) {
    return {
      error: errors.OPERATION_NOT_PERMITTED,
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

const updateVisit = (visitsData: VisitsData, servicesData: ServicesData, partsData: PartsData) => async (visitId: number, updateVisitData: UpdateVisitData) => {
  const existingVisit = await visitsData.getVisitBy('visit_id', visitId);

  if (!existingVisit) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  const {
    notes,
    performedServices,
    usedParts,
    visitEnd,
    status,
  } = updateVisitData;

  const existingServices = await Promise.all(performedServices.map(async s => {
    // getServiceBy to be changed (takes carSegment, not carSegmentId)
    const existingService = await servicesData.getServiceBy(
      s.name,
      s.carSegmentId,
    );
    if (!existingService) {
      const createdService = await servicesData.createService(
        s.name,
        s.carSegmentId,
        s.price,
      );
      return { ...s, serviceId: createdService.serviceId };
    }
    return { ...s, serviceId: existingService.serviceId };
  }));

  const existingParts = await Promise.all(usedParts.map(async p => {
    // getPart to be changed (takes carSegment, not carSegmentId)
    const existingPart = await partsData.getPartBy(p.name, p.carSegmentId);
    if (!existingPart) {
      const createdPart = await partsData.createPart(
        p.name,
        p.carSegmentId,
        p.price,
      );
      return { ...p, partId: createdPart.partId };
    }
    return { ...p, partId: existingPart.partId };
  }));

  const updatedVisit = await visitsData.updateVisit(visitId, notes, visitEnd, status);

  existingServices.forEach(async s => {
    const registeredServices = await visitsData.getPerformedServicesByVisitId(visitId, s.serviceId);
    if (registeredServices.length > 0) {
      const updatedService = visitsData.updatePerformedService(visitId, s.serviceId, s.serviceQty, s.price);
    } else {
      const newPerformedService = visitsData.registerPerformedServices([s], visitId);
    }
  });

  existingParts.forEach(async p => {
    const registeredParts = await visitsData.getUsedPartsByVisitId(visitId, p.partId);
    if (registeredParts.length > 0) {
      const updateParts = visitsData.updateUsedPart(visitId, p.partId, p.partQty, p.price);
    } else {
      const newUsedPart = visitsData.registerUsedParts([p], visitId);
    }
  });

  const result = {
    notes,
    performedServices: existingServices,
    usedParts: existingParts,
    visitEnd,
    status,
  };

  return {
    error: null,
    result,
  };
};

export default {
  createVisit,
  getVisit,
  getAllVisits,
  updateVisit,
};
