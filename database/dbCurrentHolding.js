const pool = require('../database/dbPool');

const getCurrentHoldingByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM currentHoldings WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

const createHoldingByUSerId = async (symbol, quantity, price, userid) => {
  const dbResponse = await pool.query(
    'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) + (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity + EXCLUDED.quantity), quantity = currentHoldings.quantity + EXCLUDED.quantity RETURNING *',
    [symbol, quantity, price, userid]
  );

  return dbResponse.rows;
};

const searchExistingHoldingByUserId = async (symbol, userid) => {
  const dbResponse = await pool.query(
    'SELECT quantity FROM currentHoldings WHERE symbol = $1 AND user_id::text = $2',
    [symbol, userid]
  );

  return dbResponse.rows;
};

const sellHoldingByUSerId = async (symbol, quantity, price, userid) => {
  const dbResponse = await pool.query(
    'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) - (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity - EXCLUDED.quantity), quantity = currentHoldings.quantity - EXCLUDED.quantity RETURNING *',
    [symbol, quantity, price, userid]
  );

  return dbResponse.rows;
};

module.exports = {
  getCurrentHoldingByUserId,
  createHoldingByUSerId,
  searchExistingHoldingByUserId,
  sellHoldingByUSerId,
};
