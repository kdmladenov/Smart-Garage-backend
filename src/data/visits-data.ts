import db from './pool.js';

const registerVisit = async (notes: string, vehicleId: number) => {
  const sql = `
    INSERT INTO visits (
      notes,
      vehicle_id
    )
    VALUES (?, ?);
  `;

  const result = await db.query(sql, [notes, vehicleId]);
  const visitId = result.insertId;

  return {
    notes,
    vehicleId,
    visitId,
  };
};

const registerPerformedServices = async (services: { [key: string]: string | number }[], visitId: number) => {
  const sql = `
    INSERT INTO performed_services (
      visit_id,
      service_id,
      service_qty,
      price
    )
    VALUES (?, ?, ?, ?)
  `;

  return services.map(s => db.query(sql, [visitId, s.serviceId, s.serviceQty, s.price]));
};

const registerUsedParts = async (parts: { [key: string]: string | number }[], visitId: number) => {
  const sql = `
    INSERT INTO used_parts (
      visit_id,
      part_id,
      part_qty,
      price
    )
    VALUES (?, ?, ?, ?)
  `;

  return parts.map(p => db.query(sql, [visitId, p.partId, p.partQty, p.price]));
};

const getVisitBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT
      vis.notes,
      vis.visit_start as visitStart,
      vis.visit_end as visitEnd,
      vis.status,
      vis.vehicle_id as vehicleId,
      veh.vin,
      veh.license_plate as licensePlate,
      veh.manufactured_year as manufacturedYear,
      veh.engine_type as engineType,
      veh.transmission,
      veh.model_id as modelId,
      m.model_name as modelName,
      m.manufacturer_id as manufacturerId,
      man.manufacturer_name as manufacturerName,
      m.car_segment_id as carSegment,
      veh.user_id as userId,
      u.first_name as firstName,
      u.last_name as lastName,
      u.company_name as companyName,
      u.phone,
      u.email,
      u.address_id as addressId,
      a.country,
      a.city,
      a.street_address as streetAddress
    FROM visits as vis
    LEFT JOIN vehicles as veh USING(vehicle_id)
    LEFT JOIN models as m USING(model_id)
    LEFT JOIN manufacturers as man USING(manufacturer_id)
    LEFT JOIN users as u USING(user_id)
    LEFT JOIN addresses as a USING(address_id)
    WHERE ${column} = ?;
  `;

  return (await db.query(sql, [value]))[0];
};

const getPerformedServicesByVisitId = async (visitId: number, serviceId?: number) => {
  const sql = `
    SELECT
      ps.visit_id as visitId,
      ps.service_id as serviceId,
      ps.service_qty as serviceQty,
      ps.price,
      s.name
    FROM performed_services as ps
    LEFT JOIN services as s USING(service_id)
    WHERE ps.service_qty !=0 AND visit_id = ?
    ${serviceId ? `AND service_id = ?` : ''}    
  `;

  return db.query(sql, [visitId, serviceId]);
};

const getUsedPartsByVisitId = async (visitId: number, partId?: number) => {
  const sql = `
  SELECT
    up.visit_id as visitId,
    up.part_id as partId,
    up.part_qty as partQty,
    up.price,
    p.name
  FROM used_parts as up
  LEFT JOIN parts as p USING(part_id)
  WHERE up.part_qty !=0 AND visit_id = ?
  ${partId ? `AND part_id = ?` : ''}
`;

  return db.query(sql, [visitId, partId]);
};

const getAllVisitsBy = async (userId: number, vehicleId: number, visitRangeLow: string, visitRangeHigh: string, visitStatus: string) => {
  const sql = `
  SELECT
    vis.notes,
    vis.visit_start as visitStart,
    vis.visit_end as visitEnd,
    vis.status,
    vis.vehicle_id as vehicleId,
    veh.vin,
    veh.license_plate as licensePlate,
    veh.manufactured_year as manufacturedYear,
    veh.engine_type as engineType,
    veh.transmission,
    veh.model_id as modelId,
    m.model_name as modelName,
    m.manufacturer_id as manufacturerId,
    man.manufacturer_name as manufacturerName,
    m.car_segment_id as carSegment,
    veh.user_id as userId,
    u.first_name as firstName,
    u.last_name as lastName,
    u.company_name as companyName,
    u.phone,
    u.email,
    u.address_id as addressId,
    a.country,
    a.city,
    a.street_address as streetAddress
  FROM visits as vis
  LEFT JOIN vehicles as veh USING(vehicle_id)
  LEFT JOIN models as m USING(model_id)
  LEFT JOIN manufacturers as man USING(manufacturer_id)
  LEFT JOIN users as u USING(user_id)
  LEFT JOIN addresses as a USING(address_id)
  WHERE user_id = ?
  ${vehicleId ? `AND vehicle_id = ${vehicleId}` : ''}
  ${visitStatus && `AND vis.status LIKE '%${visitStatus}%'`}
  ${visitRangeLow && visitRangeHigh ? `AND vis.visit_start BETWEEN ? AND ?` : ""}
  `;

  return db.query(sql, [userId, visitRangeLow, visitRangeHigh]);
};

const updateVisit = async (visitId: number, notes: string, visitEnd: string, status: string) => {
  const sql = `
    UPDATE visits SET
      notes = ?,
      visit_end = ?,
      status = ?
    WHERE visit_id = ?
  `;

  return db.query(sql, [notes, visitEnd, status, visitId]);
};

const updatePerformedService = (visitId: number, serviceId: number, serviceQty: number, price: number) => {
  const sql = `
    UPDATE performed_services SET 
      service_qty = ?,
      price = ?
    WHERE visit_id = ? AND service_id = ?;
  `;

  return db.query(sql, [serviceQty, price, visitId, serviceId]);
};

const updateUsedPart = (visitId: number, partId: number, partQty: number, price: number) => {
  const sql = `
    UPDATE used_parts SET 
      part_qty = ?,
      price = ?
    WHERE visit_id = ? AND part_id = ?;
  `;

  return db.query(sql, [partQty, price, visitId, partId]);
};

export default {
  registerVisit,
  registerPerformedServices,
  registerUsedParts,
  getVisitBy,
  getPerformedServicesByVisitId,
  getUsedPartsByVisitId,
  getAllVisitsBy,
  updateVisit,
  updatePerformedService,
  updateUsedPart,
};
