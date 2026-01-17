import db from '../config/db.js';

// Create transaction (borrow)
export const createTransaction = (data, callback) => {
  db.query("INSERT INTO transactions SET ?", data, callback);
};

// Get transaction by ID
export const getTransactionById = (id, callback) => {
  db.query("SELECT * FROM transactions WHERE id = ?", [id], callback);
};

// Update transaction on return
export const updateTransactionOnReturn = (id, status, returnedAt, callback) => {
  const sql = `
    UPDATE transactions
    SET status = ?, returned_at = ?
    WHERE id = ?
  `;
  db.query(sql, [status, returnedAt, id], callback);
};

// 🔹 STEP 6: Get all overdue transactions
export const getOverdueTransactions = (callback) => {
  const sql = `
    SELECT *
    FROM transactions
    WHERE status = 'overdue'
  `;
  db.query(sql, callback);
};

// 🔹 STEP 6: Count overdue books for a member
export const countOverdueByMember = (memberId, callback) => {
  const sql = `
    SELECT COUNT(*) AS count
    FROM transactions
    WHERE member_id = ? AND status = 'overdue'
  `;
  db.query(sql, [memberId], callback);
};
