const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token based on id, exclude password_hash
      const userResult = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = $1',
        [decoded.id]
      );

      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = userResult.rows[0];

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
