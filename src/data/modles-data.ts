import db from "./pool.js";

const getAll = async () => {
  const sql = `
    SELECT 
      mo.model_id as modelId,
      mo.model_name as modelName,
      ma.manufacturer_name as manufacturer,
      cs.car_segment as carSegment
    FROM models as mo
    JOIN manufacturers as ma USING(manufacturer_id)
    JOIN car_segments as cs USING(car_segment_id)
  `;
  return db.query(sql, []);
};

export default {
  getAll,
};
