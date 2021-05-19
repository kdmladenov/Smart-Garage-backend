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
      manufacturer_name,
    )
    VALUES (?);
  `;

  return db.query(sql, [manufacturer]);
};

const getModelBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT
      mod.model_id as id,
      mod.model_name as name,
      man.manufacturer as manufacturer,
      cs.car_segment as carSegment
    FROM models as mod
    LEFT JOIN manufacturers as man USING(manufacturer_id)
    LEFT JOIN car_segments as cs USING(car_segment_id)
    WHERE ${column} = ?;
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const createModel = async (modelName: string, manufacturer: string, carSegment: string) => {
  const sql = `
    INSERT INTO models
      model_name,
      manufacturer_id,
      car_segment_id
    VALUES (?, (SELECT manufacturer_id FROM manufacturers WHERE manufacturer_name = ?), (SELECT car_segment_id FROM car_segments WHERE car_segment_name = ?));
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

  const sql = `
    INSERT INTO vehicles 
      vin,
      license_plate,
      user_id,
      model_id,
      manufactured_year,
      engine_type,
      transmission
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

  const _ = db.query(sql, [vin, licensePlate, userId, modelId, manufacturedYear, engineType, transmission]);

  return vehicle;
};

const getAll = async (page: number, pagesize: number, owner: string) => {
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
    u.email as email
  FROM vehicles as v
  LEFT JOIN users as u USING(user_id)
  WHERE is_deleted = 0 AND u.email LIKE(%${owner}%)
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
