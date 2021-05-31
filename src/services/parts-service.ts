import errors from "../common/service-errors.js";
import { PartsData } from "../models/PartsData.js";
import { UpdatePartsData } from "../models/UpdatePartsData";

const createPart = (partsData: PartsData) => async (name: string, price: number, carSegment: string) => {
  const existingPart = await partsData.getPartBy(name, carSegment);
  if (existingPart) {
    return {
      error: errors.DUPLICATE_RECORD,
      part: null,
    };
  }
  const part = await partsData.createPart(name, carSegment, +price);

  return {
    error: null,
    part,
  };
};

const getAllParts = (partsData: PartsData) => async (
  page?: number,
  pageSize?: number,
  priceLow?: number,
  priceHigh?: number,
  partName?: string,
  carSegment?: string,
) => {
  const result = await partsData.getAllParts(
    page,
    pageSize,
    priceLow,
    priceHigh,
    partName,
    carSegment,
  );

  return result;
};

const getPartById = (partsData: PartsData) => async (partId: number) => {
  const part = await partsData.getBy("part_id", partId);

  if (!part) {
    return {
      error: errors.RECORD_NOT_FOUND,
      part: null,
    };
  }

  return {
    error: null,
    part,
  };
};

const updatePart = (partsData: PartsData) => async (updatedPartData: UpdatePartsData, partId: number) => {
  const existingPart = await partsData.getBy("part_id", +partId);

  if (!existingPart) {
    return {
      error: errors.RECORD_NOT_FOUND,
      part: null,
    };
  }
  const updated = { ...existingPart, ...updatedPartData };
  const part = await partsData.update(updated, +partId);
  return {
    error: null,
    part,
  };
};

const deletePart = (partsData: PartsData) => async (partId: number) => {
  const partToDelete = await partsData.getBy("part_id", +partId);

  if (!partToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      part: null,
    };
  }

  const _ = await partsData.remove(+partId);

  return {
    error: null,
    part: { ...partToDelete, isDeleted: 1 },
  };
};

export default {
  createPart,
  getPartById,
  getAllParts,
  updatePart,
  deletePart,
};
