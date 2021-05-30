import { ModelsData } from "../models/ModelsData";

const getAllModels = (manufacturersData: ModelsData) => async () => ({
  error: null,
  result: await manufacturersData.getAll(),
});

export default {
  getAllModels,
};
