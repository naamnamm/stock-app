const pool = require('../database/dbPool');

const updateCashBalanceByUserId = async (amount, userid) => {
  const dbResponse = await pool.query(
    'INSERT INTO cash_balances (amount, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET amount = cash_balances.amount + EXCLUDED.amount RETURNING *',
    [amount, userid]
  );

  return dbResponse.rows;
};

const getCashBalanceByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT amount FROM cash_balances WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows[0];
};

module.exports = {
  getCashBalanceByUserId,
  updateCashBalanceByUserId,
};

//e0183565-a2fd-4168-bb23-bc7ad78010bc
