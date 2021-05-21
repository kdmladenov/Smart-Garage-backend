import db from "./pool.js";

const getPartBy = async (name: string, carSegmentId: number) => {
  const sql = `
    SELECT
      part_id,
      name,
      price,
      car_segment_id
    FROM parts
    WHERE name = ? AND car_segment_id = ? AND is_deleted = 0;
  `;

  return (await db.query(sql, [name, carSegmentId]))[0];
};

const createPart = async (name: string, carSegmentId: number, price: number) => {
  const sql = `
    INSERT INTO parts (
      name,
      price,
      car_segment_id
    )
    VALUES (?, ?, ?);
  `;

  return (await db.query(sql, [name, price, carSegmentId]))[0];
};

export default {
  getPartBy,
  createPart,
};
