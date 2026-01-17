import { getBookById, updateBookAfterBorrow, updateBookAfterReturn } from '../models/bookModel.js';
import {
  getMemberById,
  countActiveBorrows,
  hasUnpaidFines,
  suspendMember
} from '../models/memberModel.js';
import {
  createTransaction,
  getTransactionById,
  updateTransactionOnReturn,
  getOverdueTransactions,
  countOverdueByMember
} from '../models/transactionModel.js';
import { createFine } from '../models/fineModel.js';
import { getBorrowDate, getDueDate } from '../utils/dateUtils.js';

/* ---------- BORROW BOOK ---------- */
export const borrowBook = (req, res) => {
  const { book_id, member_id } = req.body;

  getMemberById(member_id, (err, memberResult) => {
    if (memberResult.length === 0)
      return res.status(404).json({ message: "Member not found" });

    if (memberResult[0].status !== 'active')
      return res.status(403).json({ message: "Member suspended" });

    getBookById(book_id, (err, bookResult) => {
      if (bookResult.length === 0)
        return res.status(404).json({ message: "Book not found" });

      if (bookResult[0].available_copies <= 0)
        return res.status(409).json({ message: "Book not available" });

      countActiveBorrows(member_id, (err, countResult) => {
        if (countResult[0].count >= 3)
          return res.status(400).json({ message: "Borrow limit reached" });

        hasUnpaidFines(member_id, (err, fineResult) => {
          if (fineResult[0].count > 0)
            return res.status(403).json({ message: "Unpaid fines exist" });

          const transactionData = {
            book_id,
            member_id,
            borrowed_at: getBorrowDate(),
            due_date: getDueDate(),
            status: 'active'
          };

          createTransaction(transactionData, () => {
            updateBookAfterBorrow(book_id, () => {
              res.json({ message: "Book borrowed successfully" });
            });
          });
        });
      });
    });
  });
};

/* ---------- RETURN BOOK ---------- */
export const returnBook = (req, res) => {
  const transactionId = req.params.id;

  getTransactionById(transactionId, (err, result) => {
    if (result.length === 0)
      return res.status(404).json({ message: "Transaction not found" });

    const transaction = result[0];
    const today = new Date();
    let status = 'returned';

    if (today > transaction.due_date) {
      status = 'overdue';
      const daysLate = Math.ceil(
        (today - transaction.due_date) / (1000 * 60 * 60 * 24)
      );

      const fineAmount = daysLate * 0.5;

      createFine({
        member_id: transaction.member_id,
        transaction_id: transaction.id,
        amount: fineAmount
      }, () => {});
    }

    updateTransactionOnReturn(transactionId, status, today, () => {
      updateBookAfterReturn(transaction.book_id, () => {
        res.json({ message: "Book returned successfully", status });
      });
    });
  });
};

/* ---------- STEP 6: OVERDUE REPORT ---------- */
export const getOverdueList = (req, res) => {
  getOverdueTransactions((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Check suspension for each member
    results.forEach((tx) => {
      countOverdueByMember(tx.member_id, (err, countResult) => {
        if (countResult[0].count >= 3) {
          suspendMember(tx.member_id, () => {});
        }
      });
    });

    res.json(results);
  });
};
