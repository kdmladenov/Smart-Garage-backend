import { Vehicle } from '../models/Vehicle';
import db from './pool.js';

const getManufacturerBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT
      manufacturer_id as id,
      manufacturer_name as name
    FROM manufacturers
    WHERE ${column} = ?;
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const createManufacturer = async (manufacturer: string) => {
  const sql = `
    INSERT INTO manufacturers (
      manufacturer_name
    )
    VALUES (?);
  `;

  return db.query(sql, [manufacturer]);
};

const getModelBy = async (column: string, value: string | number, manufacturer: string) => {
  // console.log(column, value, manufacturer);
  const sql = `
    SELECT
      m.model_id as id,
      m.model_name as modelName,
      mf.manufacturer_name as manufacturer,
      cs.car_segment as carSegment
    FROM models as m
    LEFT JOIN manufacturers as mf USING(manufacturer_id)
    LEFT JOIN car_segments as cs USING(car_segment_id)
    WHERE ${column} = ? AND manufacturer_name = ?;
  `;

  const result = await db.query(sql, [value, manufacturer]);
  return result[0];
};

const createModel = async (modelName: string, manufacturer: string, carSegment: string) => {
  const sql = `
    INSERT INTO models (
      model_name,
      manufacturer_id,
      car_segment_id
    )
    VALUES (?, (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name = ?), (SELECT car_segment_id FROM car_segments WHERE car_segment = ?));
  `;

  return db.query(sql, [modelName, manufacturer, carSegment]);
};

const getVehicleBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT
      vehicle_id as vehicleId,
      vin,
      license_plate as licensePlate,
      user_id as userId,
      model_id as modelId,
      manufactured_year as manufacturedYear,
      engine_type as engineType,
      transmission
    FROM vehicles
    WHERE is_deleted = 0 AND ${column} = ?;
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (vehicle: Vehicle) => {
  const {
    vin,
    licensePlate,
    userId,
    modelId,
    manufacturedYear,
    engineType,
    transmission,
  } = vehicle;

  console.log(vehicle);

  const sql = `
    INSERT INTO vehicles (
      vin,
      license_plate,
      user_id,
      model_id,
      manufactured_year,
      engine_type,
      transmission
    )
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const createdVehicle = await db.query(sql, [vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission]);
  const vehicleId = createdVehicle.insertId;

  return { ...vehicle, vehicleId };
};

const update = async (vehicle: Vehicle) => {
  const {
    vin,
    licensePlate,
    userId,
    modelId,
    manufacturedYear,
    engineType,
    transmission,
    vehicleId,
  } = vehicle;

  const sql = `
    UPDATE vehicles SET
      vin = ?,
      license_plate = ?,
      user_id = ?,
      model_id = ?,
      manufactured_year = ?,
      engine_type = ?,
      transmission = ?
    WHERE vehicle_id = ?
  `;

  const _ = db.query(sql, [vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission, vehicleId]);

  return vehicle;
};

const getAll = async (
  page: number,
  pagesize: number,
  email: string,
  fullName: string,
  userId: number,
) => {
  const offset = page ? (page - 1) * pagesize : 0;
  const sql = `
  SELECT
    v.vehicle_id as vehicleId,
    v.vin,
    v.license_plate as licensePlate,
    v.model_id as modelId,
    v.manufactured_year as manufacturedYear,
    v.engine_type as engineType,
    v.transmission,
    v.user_id as userId,
    u.email as email,
    u.full_name as fullName,
    mo.manufacturer_id as manufacturerId,
    mo.car_segment_id as carSegmentId,
    mo.model_name as modelName,
    ma.manufacturer_name as manufacturer,
    se.car_segment as carSegment
  FROM vehicles as v
  LEFT JOIN models as mo USING(model_id)
  LEFT JOIN manufacturers as ma USING(manufacturer_id)
  LEFT JOIN car_segments as se USING(car_segment_id)
  LEFT JOIN (SELECT 
              CONCAT(first_name, ' ', last_name) as full_name,
              email,
              user_id,
              is_deleted
            FROM users) as u USING(user_id)
  WHERE u.is_deleted = 0 ${email && `AND u.email LIKE('%${email}%')`} 
  ${fullName && `AND u.full_name like('%${fullName}%')`}
  ${userId > 0 ? `AND u.user_id = ${userId}` : ''}
  LIMIT ? OFFSET ?;         
  `;

  return db.query(sql, [pagesize, offset]);
};

export default {
  getManufacturerBy,
  createManufacturer,
  getModelBy,
  createModel,
  getVehicleBy,
  create,
  update,
  getAll,
};
