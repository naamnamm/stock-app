require('dotenv').config();
const Pool = require('pg').Pool;

// const pool = new Pool({
//   user: 'postgres',
//   password: '12345678',
//   host: 'localhost',
//   port: 5432,
//   database: 'stock_app',
// });

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
