require('dotenv').config();
const Pool = require('pg').Pool;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// });

const pool = new Pool({
  user: 'qxzmoxxb',
  password: 'TbV_UouGemb2PbhBExheE8na8LRKS9oN',
  host: 'lallah.db.elephantsql.com',
  port: 5432,
  database: 'qxzmoxxb',
});

module.exports = pool;
