import db from '../config/db.js';

// Create fine
export const createFine = (data, callback) => {
  db.query("INSERT INTO fines SET ?", data, callback);
};

// Get fine by ID
export const getFineById = (id, callback) => {
  db.query("SELECT * FROM fines WHERE id = ?", [id], callback);
};

// Mark fine as paid
export const payFineById = (id, paidAt, callback) => {
  const sql = `
    UPDATE fines
    SET paid_at = ?
    WHERE id = ?
  `;
  db.query(sql, [paidAt, id], callback);
};
