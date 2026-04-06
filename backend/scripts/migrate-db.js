const pool = require('../config/db');

async function migrate() {
  try {
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo TEXT;');
    console.log('Successfully added profile_photo column to users table.');
  } catch (err) {
    console.error('Error modifying table:', err);
  } finally {
    pool.end();
  }
}

migrate();
