import errors from "../common/service-errors.js";
import { CreateVehicleData } from "../models/CreateVehicleData";
import { VehiclesData } from "../models/VehiclesData";

const createVehicle = (vehiclesData: VehiclesData) => async (createVehicleData: CreateVehicleData) => {
  const {
    vin,
    licensePlate,
    userId,
    manufacturedYear,
    engineType,
    transmission,
    modelName,
    manufacturer,
    carSegment,
  } = createVehicleData;

  const vehicle = {
    vin,
    licensePlate,
    userId,
    manufacturedYear,
    engineType,
    transmission,
    modelId: 0,
  };

  const existingVehicle = await vehiclesData.getVehicleBy('vin', vin);

  if (existingVehicle) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null,
    };
  }

  const existingManufacturer = await vehiclesData.getManufacturerBy('manufacturer_name', manufacturer);
  if (!existingManufacturer) {
    const newManufacturer = await vehiclesData.createManufacturer(manufacturer);
  }

  const existingModel = await vehiclesData.getModelBy('model_name', modelName, manufacturer);
  if (!existingModel) {
    const newModel = await vehiclesData.createModel(modelName, manufacturer, carSegment);
    vehicle.modelId = +newModel.createId;
  } else {
    vehicle.modelId = +existingModel.id;
  }

  return {
    error: null,
    result: await vehiclesData.create(vehicle),
  };
};

const updateVehicle = (vehiclesData: VehiclesData) => async (updateVehicleData: CreateVehicleData, vehicleId: number) => {
  const {
    vin,
    licensePlate,
    userId,
    manufacturedYear,
    engineType,
    transmission,
    modelName,
    manufacturer,
    carSegment,
  } = updateVehicleData;

  const vehicle = {
    vin,
    licensePlate,
    userId,
    manufacturedYear,
    engineType,
    transmission,
    vehicleId,
    modelId: 0,
  };

  const existingVehicle = await vehiclesData.getVehicleBy('vehicle_id', vehicleId);

  if (!existingVehicle) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  if (vin) {
    const vehicleByVin = await vehiclesData.getVehicleBy('vin', vin);
    if (vehicleByVin && vehicleByVin.vehicleId !== vehicleId) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null,
      };
    }
  }

  if (licensePlate) {
    const vehicleByLicensePlate = await vehiclesData.getVehicleBy('license_plate', licensePlate);
    if (vehicleByLicensePlate && vehicleByLicensePlate.vehicleId !== vehicleId) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null,
      };
    }
  }

  const existingManufacturer = await vehiclesData.getManufacturerBy('manufacturer_name', manufacturer);
  if (!existingManufacturer) {
    const newManufacturer = await vehiclesData.createManufacturer(manufacturer);
  }

  const existingModel = await vehiclesData.getModelBy('model_name', modelName, manufacturer);
  if (!existingModel) {
    const newModel = await vehiclesData.createModel(modelName, manufacturer, carSegment);
    vehicle.modelId = +newModel.insertId;
  } else {
    vehicle.modelId = +existingModel.id;
  }

  return {
    error: null,
    result: await vehiclesData.update(vehicle),
  };
};

const getVehicle = (vehiclesData: VehiclesData) => async (vehicleId: number) => {
  const vehicle = await vehiclesData.getVehicleBy('vehicle_id', vehicleId);

  if (!vehicle) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  return {
    error: null,
    result: vehicle,
  };
};

const getAllVehicles = (vehiclesData: VehiclesData) => async (
  page: number,
  pagesize: number,
  email: string,
  fullName: string,
  userId: number,
) => {
  const vehicles = await vehiclesData.getAll(
    page,
    pagesize,
    email,
    fullName,
    userId,
  );

  return {
    error: null,
    result: vehicles,
  };
};

export default {
  createVehicle,
  updateVehicle,
  getVehicle,
  getAllVehicles,
};
