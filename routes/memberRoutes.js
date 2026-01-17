import express from 'express';
import {
  createMember,
  getMembers
} from '../controllers/memberController.js';

const router = express.Router();

// POST add member
router.post('/', createMember);

// GET all members
router.get('/', getMembers);

export default router;
