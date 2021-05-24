import db from "./pool.js";
import { UpdateServicesData } from "../models/UpdateServicesData";

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

const getAllServices = async (
  page: number,
  pageSize: number,
  priceLow: number,
  priceHigh: number,
  serviceName?: string,
  carSegment?: string,
) => {
  const offset = page ? (page - 1) * pageSize : 0;
  const sql = `
    SELECT
    s.service_id as serviceId,
    s.name as serviceName,
    s.price as servicePrice,
    s.car_segment_id as carSegmentId,
    cs.car_segment as carSegment
    FROM services as s
    LEFT JOIN car_segments as cs USING(car_segment_id)
    WHERE is_deleted = 0
    ${serviceName && `AND s.name LIKE '%${serviceName}%'`}
    ${carSegment && `AND cs.car_segment LIKE '%${carSegment}%'`}
    ${priceLow && priceHigh && "AND price BETWEEN ? and ?"}
    LIMIT ? OFFSET ?;
    `;

  return db.query(sql, [priceLow, priceHigh, +pageSize, +offset]);
};

const getBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT
    s.service_id as serviceId,
    s.name,
    s.price,
    s.car_segment_id as carSegmentId,
    cs.car_segment as carSegment
    FROM services as s
    LEFT JOIN car_segments as cs USING(car_segment_id)
    WHERE is_deleted = 0 AND ${column} = ?
    ;`;

  const result = await db.query(sql, [+value]);
  return result[0];
};

const createService = async (
  name: string,
  carSegmentId: number,
  price: number,
) => {
  const sql = `
      INSERT INTO services (
        name,
        car_segment_id,
        price
      )
      VALUES (?, ?, ?);
    `;

  // return (await db.query(sql, [name, +carSegmentId, +price]))[0];
  const result = await db.query(sql, [name, +carSegmentId, +price]);
  return getBy('service_id', result.insertId);
};

const update = async (updated: UpdateServicesData, serviceId: number) => {
  const sql = `
        UPDATE services
        SET
          name = ?,
          price = ?,
          car_segment_id = ?
        WHERE service_id = ?
    `;

  const _ = await db.query(sql, [
    updated.name,
    updated.price,
    updated.carSegmentId,
    serviceId,
  ]);

  return getBy("service_id", +serviceId);
};

const remove = async (serviceId: number) => {
  const sql = `
        UPDATE services 
        SET is_deleted = true
        WHERE service_id = ?
    `;

  return db.query(sql, [+serviceId]);
};

export default {
  getServiceBy,
  createService,
  getAllServices,
  update,
  remove,
  getBy,
};
