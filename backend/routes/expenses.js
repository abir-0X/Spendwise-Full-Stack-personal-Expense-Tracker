const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// Route for getting all expenses and creating a new one
router.route('/')
  .get(protect, getExpenses)
  .post(protect, addExpense);

// Route for updating and deleting a specific expense
router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;
