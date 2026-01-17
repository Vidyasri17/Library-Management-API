import { getFineById, payFineById } from '../models/fineModel.js';

export const payFine = (req, res) => {
  const fineId = req.params.id;

  getFineById(fineId, (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({ message: "Fine not found" });
    }

    const fine = result[0];

    if (fine.paid_at) {
      return res.status(400).json({ message: "Fine already paid" });
    }

    payFineById(fineId, new Date(), () => {
      res.json({ message: "Fine paid successfully" });
    });
  });
};
