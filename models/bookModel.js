import db from '../config/db.js';

/* ---------- STEP 2: BOOK APIs ---------- */

export const getAllBooks = (callback) => {
  db.query("SELECT * FROM books", callback);
};

export const getAvailableBooks = (callback) => {
  db.query(
    "SELECT * FROM books WHERE status='available' AND available_copies > 0",
    callback
  );
};

export const addBook = (bookData, callback) => {
  db.query("INSERT INTO books SET ?", bookData, callback);
};

/* ---------- STEP 4 & 5: BORROW / RETURN ---------- */

export const getBookById = (id, callback) => {
  db.query("SELECT * FROM books WHERE id = ?", [id], callback);
};

export const updateBookAfterBorrow = (id, callback) => {
  const sql = `
    UPDATE books
    SET available_copies = available_copies - 1,
        status = IF(available_copies - 1 = 0, 'borrowed', 'available')
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};

export const updateBookAfterReturn = (id, callback) => {
  const sql = `
    UPDATE books
    SET available_copies = available_copies + 1,
        status = 'available'
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};
