import db from "./pool.js";

const getServiceBy = async (name: string, carSegmentId: number) => {
  const sql = `
    SELECT
      service_id,
      name,
      price,
      car_segment_id
    FROM services
    WHERE name = ? AND car_segment_id = ? AND is_deleted = 0;
  `;

  return (await db.query(sql, [name, carSegmentId]))[0];
};

const createService = async (name: string, carSegmentId: number, price: number) => {
  const sql = `
    INSERT INTO services (
      name,
      price,
      car_segment_id
    )
    VALUES (?, ?, ?);
  `;

  return (await db.query(sql, [name, price, carSegmentId]))[0];
};

export default {
  getServiceBy,
  createService,
};
