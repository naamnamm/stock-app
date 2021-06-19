const pool = require('../database/dbPool');

const getOrderByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM orders WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

const createOrderByUserId = async (symbol, type, quantity, price, userid) => {
  const dbResponse = await pool.query(
    'INSERT INTO orders (symbol, type, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [symbol, type, quantity, price, userid]
  );

  return dbResponse.rows;
};

module.exports = { getOrderByUserId, createOrderByUserId };
