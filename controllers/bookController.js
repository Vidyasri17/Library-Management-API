import {
  getAllBooks,
  getAvailableBooks,
  addBook
} from '../models/bookModel.js';

// GET /books
export const getBooks = (req, res) => {
  getAllBooks((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

// GET /books/available
export const getAvailable = (req, res) => {
  getAvailableBooks((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

// POST /books
export const createBook = (req, res) => {
  const bookData = req.body;

  addBook(bookData, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Book added successfully" });
  });
};
