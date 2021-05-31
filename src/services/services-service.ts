import errors from "../common/service-errors.js";
import { ServicesData } from "../models/ServicesData.js";
import { UpdateServicesData } from "../models/UpdateServicesData";

const createService = (servicesData: ServicesData) => async (name: string, price: number, carSegment: string) => {
  const existingService = await servicesData.getServiceBy(name, carSegment);
  if (existingService) {
    return {
      error: errors.DUPLICATE_RECORD,
      service: null,
    };
  }
  const service = await servicesData.createService(
    name,
    carSegment,
    +price,
  );

  return {
    error: null,
    service,
  };
};

const getAllServices = (servicesData: ServicesData) => async (
  page?: number,
  pageSize?: number,
  priceLow?: number,
  priceHigh?: number,
  serviceName?: string,
  carSegment?: string,
) => {
  const result = await servicesData.getAllServices(
    page,
    pageSize,
    priceLow,
    priceHigh,
    serviceName,
    carSegment,
  );

  return result;
};

const getServiceById = (servicesData: ServicesData) => async (serviceId: number) => {
  const service = await servicesData.getBy("service_id", serviceId);

  if (!service) {
    return {
      error: errors.RECORD_NOT_FOUND,
      service: null,
    };
  }

  return {
    error: null,
    service,
  };
};

const updateService = (servicesData: ServicesData) => async (updatedServiceData: UpdateServicesData, serviceId: number) => {
  const existingService = await servicesData.getBy("service_id", +serviceId);

  if (!existingService) {
    return {
      error: errors.RECORD_NOT_FOUND,
      service: null,
    };
  }
  const updated = { ...existingService, ...updatedServiceData };
  const service = await servicesData.update(updated, +serviceId);
  return {
    error: null,
    service,
  };
};

const deleteService = (servicesData: ServicesData) => async (serviceId: number) => {
  const serviceToDelete = await servicesData.getBy("service_id", +serviceId);

  if (!serviceToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      service: null,
    };
  }

  const _ = await servicesData.remove(+serviceId);

  return {
    error: null,
    service: { ...serviceToDelete, isDeleted: 1 },
  };
};

export default {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
};
