const pool = require('../config/db');

// @desc    Get all expenses for the logged in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const expenses = await pool.query(
      'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
      [req.user.id]
    );

    res.json(expenses.rows);
  } catch (error) {
    console.error('Error in getExpenses:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
  try {
    let { amount, category, description, date } = req.body;

    // 1. Validation runs FIRST, before any DB query
    // Validate Amount
    if (amount === undefined || amount === null) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' }); // Early return
    }

    // Validate Category
    if (category === undefined || category === null) {
      return res.status(400).json({ message: 'Invalid category' });
    }
    if (typeof category === 'string') {
      category = category.trim();
    }
    if (typeof category !== 'string' || category === '') {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Validate Date
    if (date === undefined || date === null) {
      return res.status(400).json({ message: 'Invalid date' });
    }
    if (isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: 'Invalid date' });
    }

    description = description !== undefined ? description : null;

    // 2. Execute DB Query using purely validated & parsed variables with explicit postgres type casts
    const newExpense = await pool.query(
      'INSERT INTO expenses (user_id, amount, category, description, date) VALUES ($1::integer, $2::numeric, $3::varchar, $4::text, $5::date) RETURNING *',
      [req.user.id, parsedAmount, category, description, date]
    );

    res.status(201).json(newExpense.rows[0]);
  } catch (error) {
    console.error('Error in addExpense:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    let { amount, category, description, date } = req.body;
    
    let queryAmount = null; // Prepare for DB wrapper

    // 1. Validation runs FIRST, before any DB query
    // Validate Amount if present
    if (amount !== undefined && amount !== null) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' }); // Early return
      }
      queryAmount = parsedAmount; // Bind safe numeric value
    }

    // Validate Category if present
    if (category !== undefined && category !== null) {
      if (typeof category === 'string') {
        category = category.trim();
      }
      if (typeof category !== 'string' || category === '') {
        return res.status(400).json({ message: 'Invalid category' }); // Early return
      }
    } else {
      category = null;
    }

    // Validate Date if present
    if (date !== undefined && date !== null) {
      if (isNaN(new Date(date).getTime())) {
        return res.status(400).json({ message: 'Invalid date' }); // Early return
      }
    } else {
      date = null;
    }

    description = description !== undefined ? description : null;

    // 2. Execute DB Query using COALESCE with the safely validated bindings, including explicit postgres type casts
    const updatedExpense = await pool.query(
      'UPDATE expenses SET amount = COALESCE($1::numeric, amount), category = COALESCE($2::varchar, category), description = COALESCE($3::text, description), date = COALESCE($4::date, date) WHERE id = $5 AND user_id = $6 RETURNING *',
      [queryAmount, category, description, date, id, req.user.id]
    );

    if (updatedExpense.rows.length === 0) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.json(updatedExpense.rows[0]);
  } catch (error) {
    console.error('Error in updateExpense:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await pool.query(
      'DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (deletedExpense.rows.length === 0) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.json({ message: 'Expense removed', expense: deletedExpense.rows[0] });
  } catch (error) {
    console.error('Error in deleteExpense:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
