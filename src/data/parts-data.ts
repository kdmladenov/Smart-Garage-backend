import db from "./pool.js";
import { UpdatePartsData } from "../models/UpdatePartsData";

const getPartBy = async (name: string, carSegment: string) => {
  const sql = `
    SELECT
      part_id as partId,
      name,
      price,
      car_segment_id as carSegmentId
    FROM parts
    WHERE name = ? AND car_segment_id = (SELECT car_segment_id FROM car_segments WHERE car_segment = ?) AND is_deleted = 0;
  `;

  return (await db.query(sql, [name, carSegment]))[0];
};

const getAllParts = async (
  page: number,
  pageSize: number,
  priceLow: number,
  priceHigh: number,
  partName?: string,
  carSegment?: string,
) => {
  const offset = page ? (page - 1) * pageSize : 0;
  const sql = `
    SELECT    
    COUNT(*) OVER () AS totalDBItems,
    s.part_id as partId,
    s.name,
    s.price,
    s.car_segment_id as carSegmentId,
    cs.car_segment as carSegment
    FROM parts as s
    LEFT JOIN car_segments as cs USING(car_segment_id)
    WHERE is_deleted = 0
    ${partName && `AND s.name LIKE '%${partName}%'`}
    ${carSegment && `AND cs.car_segment LIKE '%${carSegment}%'`}
    ${priceLow && priceHigh && 'AND price BETWEEN ? and ?'}
    ORDER BY name ASC
    ${pageSize ? `LIMIT ? OFFSET ?` : ''}
    `;

  return db.query(sql, [priceLow, priceHigh, +pageSize, +offset]);
};

const getBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT
    s.part_id as partId,
    s.name,
    s.price,
    s.car_segment_id as carSegmentId,
    cs.car_segment as carSegment
    FROM parts as s
    LEFT JOIN car_segments as cs USING(car_segment_id)
    WHERE is_deleted = 0 AND ${column} = ?
    ;`;

  const result = await db.query(sql, [+value]);
  return result[0];
};

const createPart = async (
  name: string,
  carSegment: string,
  price: number,
) => {
  const sql = `
      INSERT INTO parts (
        name,
        car_segment_id,
        price
        )
        VALUES (?, (SELECT car_segment_id FROM car_segments WHERE car_segment = ?), ?);
        `;

  const result = await db.query(sql, [name, carSegment, +price]);
  return getBy("part_id", result.insertId);
};

const update = async (updated: UpdatePartsData, partId: number) => {
  const sql = `
        UPDATE parts
        SET
        name = ?,
          price = ?,
          car_segment_id = (SELECT car_segment_id FROM car_segments WHERE car_segment = ?)
        WHERE part_id = ?
    `;

  const _ = await db.query(sql, [
    updated.name,
    updated.price,
    updated.carSegment,
    partId,
  ]);

  return getBy("part_id", +partId);
};

const remove = async (partId: number) => {
  const sql = `
        UPDATE parts 
        SET is_deleted = true
        WHERE part_id = ?
    `;

  return db.query(sql, [+partId]);
};

export default {
  getPartBy,
  createPart,
  getAllParts,
  update,
  remove,
  getBy,
};
