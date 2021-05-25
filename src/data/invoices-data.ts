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
    WHERE i.invoice_id != 0
    ${visitId ? ` AND visit_id = ${visitId}` : ''}
    ${userId ? ` AND user_id = ${userId}` : ''}
    ${dateRangeLow && dateRangeHigh ? ` AND vi.visit_start BETWEEN "${dateRangeLow}" AND "${dateRangeHigh}"` : ""}
  `;

  return db.query(sql, []);
};

const create = async (visitId: number) => {
  const sql = `
    INSERT INTO invoices (
      visit_id
    )
    VALUES (?);
  `;

  const result = await db.query(sql, [visitId]);

  return getBy('invoice_id', result.insertId);
};

export default {
  getBy,
  getAll,
  create,
};
