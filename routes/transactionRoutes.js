import express from 'express';
import {
  borrowBook,
  returnBook,
  getOverdueList
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/borrow', borrowBook);
router.post('/:id/return', returnBook);
router.get('/overdue', getOverdueList);

export default router;
