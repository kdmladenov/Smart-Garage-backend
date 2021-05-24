import db from "./pool.js";

const getBy = async (column: string, value: number) => {
  const sql = `
    SELECT
      invoice_id as invoiceId,
      visit_id as visitId,
      date,
      due_date as dueDate
    FROM invoices
    WHERE ${column} = ?;
  `;

  return (await db.query(sql, [value]))[0];
};

const create = async (visitId: number) => {
  const sql = `
    INSERT INTO invoices (
      visitId
    )
    VALUES (?);
  `;

  const result = await db.query(sql, [visitId]);

  return getBy('invoice_id', result.insertId);
};

const getAll = async (userId: number, visitId: number, dateRangeLow: string, dateRangeHigh: string) => {
  const sql = `
    SELECT
      i.invoice_id as invoiceId,
      i.visit_id as visitId,
      i.date,
      i.due_date as dueDate,
      vi.vehicle_id as vehicleId,
      ve.user_id as userId
    FROM invoices as i
    LEFT JOIN visits as vi USING (visit_id)
    LEFT JOIN vehicles as ve USING (vehicle_id)
    ${visitId ? `AND visit_id = ${visitId}` : ''}
    ${userId ? `AND user_id = ?` : ''}
    ${dateRangeLow && dateRangeHigh ? `AND vis.visit_start BETWEEN ? AND ?` : ""}
  `;

  return db.query(sql, [userId, dateRangeLow, dateRangeHigh]);
};

export default {
  getBy,
  create,
  getAll,
};
