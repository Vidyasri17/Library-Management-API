import {
  addMember,
  getAllMembers
} from '../models/memberModel.js';

// POST /members
export const createMember = (req, res) => {
  const memberData = req.body;

  addMember(memberData, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Member added successfully" });
  });
};

// GET /members
export const getMembers = (req, res) => {
  getAllMembers((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};
