import express from 'express';
import {
  getBooks,
  getAvailable,
  createBook
} from '../controllers/bookController.js';

const router = express.Router();

// GET all books
router.get('/', getBooks);

// GET available books
router.get('/available', getAvailable);

// POST add book
router.post('/', createBook);

export default router;
