const fs = require('fs');
const path = require('path');
require('dotenv').config();
const pool = require('../config/db');

async function initializeDatabase() {
  const client = await pool.connect();
  try {
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running database schema initialization...');
    await client.query(schemaSql);
    console.log('Database schema successfully initialized!');
  } catch (error) {
    console.error('Error initializing database schema:', error);
  } finally {
    client.release();
    pool.end();
  }
}

initializeDatabase();
