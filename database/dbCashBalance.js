const pool = require('../database/dbPool');

const createCashBalanceByUserId = async (type, amount, userid) => {
  await pool.query(
    'INSERT INTO cash_balance (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
    [type, amount, userid]
  );
};

const getCashBalanceByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT amount FROM cash_balance WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

module.exports = { createCashBalanceByUserId, getCashBalanceByUserId };
