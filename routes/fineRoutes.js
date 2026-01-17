import express from 'express';
import { payFine } from '../controllers/fineController.js';

const router = express.Router();

router.post('/:id/pay', payFine);

export default router;
