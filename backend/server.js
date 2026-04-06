const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const expensesRoutes = require('./routes/expenses');
const dashboardRoutes = require('./routes/dashboard');

// Basic root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
