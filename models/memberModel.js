import db from '../config/db.js';

/* ---------- STEP 3: MEMBER APIs ---------- */

export const addMember = (memberData, callback) => {
  db.query("INSERT INTO members SET ?", memberData, callback);
};

export const getAllMembers = (callback) => {
  db.query("SELECT * FROM members", callback);
};

/* ---------- STEP 4 & 6: BORROW + SUSPENSION ---------- */

export const getMemberById = (id, callback) => {
  db.query("SELECT * FROM members WHERE id = ?", [id], callback);
};

export const countActiveBorrows = (memberId, callback) => {
  const sql = `
    SELECT COUNT(*) AS count
    FROM transactions
    WHERE member_id = ? AND status = 'active'
  `;
  db.query(sql, [memberId], callback);
};

export const hasUnpaidFines = (memberId, callback) => {
  const sql = `
    SELECT COUNT(*) AS count
    FROM fines
    WHERE member_id = ? AND paid_at IS NULL
  `;
  db.query(sql, [memberId], callback);
};

// 🔹 STEP 6: Suspend member
export const suspendMember = (memberId, callback) => {
  const sql = `
    UPDATE members
    SET status = 'suspended'
    WHERE id = ?
  `;
  db.query(sql, [memberId], callback);
};
