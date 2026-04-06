const pool = require('../config/db');

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get total monthly expenses and overall total number of transactions
    const summaryQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN date_trunc('month', date) = date_trunc('month', CURRENT_DATE) THEN amount ELSE 0 END), 0) AS "totalMonthlyExpenses",
        COUNT(id) AS "totalTransactions"
      FROM expenses
      WHERE user_id = $1
    `;
    const summaryResult = await pool.query(summaryQuery, [userId]);
    const summaryData = summaryResult.rows[0];

    // 2. Get category-wise expense breakdown
    const categoryQuery = `
      SELECT 
        category, 
        COALESCE(SUM(amount), 0) AS "totalAmount"
      FROM expenses
      WHERE user_id = $1
      GROUP BY category
      ORDER BY "totalAmount" DESC
    `;
    const categoryResult = await pool.query(categoryQuery, [userId]);

    res.json({
      totalMonthlyExpenses: Number(summaryData.totalMonthlyExpenses),
      totalTransactions: Number(summaryData.totalTransactions),
      categoryBreakdown: categoryResult.rows.map(row => ({
        category: row.category,
        totalAmount: Number(row.totalAmount)
      }))
    });

  } catch (error) {
    console.error('Error in getDashboardSummary:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getDashboardSummary
};
