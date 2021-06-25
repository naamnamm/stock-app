const pool = require('../database/dbPool');

const getCurrentHoldingByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM currentHoldings WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

// const createHoldingByUserId = async (symbol, quantity, price, userid) => {
//   const dbResponse = await pool.query(
//     'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
//     [symbol, quantity, price, userid]
//   );

//   return dbResponse.rows;
// };

const searchExistingHoldingByUserId = async (symbol, userid) => {
  const dbResponse = await pool.query(
    'SELECT quantity FROM currentHoldings WHERE symbol = $1 AND user_id::text = $2',
    [symbol, userid]
  );

  return dbResponse.rows;
};

const createOrUpdateBuyingHoldingByUserId = async (
  symbol,
  quantity,
  price,
  userid
) => {
  // (68 * 1) + (29 * 62.86) / (29+1)
  //purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) - (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity - EXCLUDED.quantity),
  // quantity = currentHoldings.quantity + EXCLUDED.quantity

  const dbResponse = await pool.query(
    'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) + (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity + EXCLUDED.quantity), quantity = currentHoldings.quantity + EXCLUDED.quantity RETURNING *',
    [symbol, quantity, price, userid]
  );

  return dbResponse.rows;
};

const createOrUpdateSellingHoldingByUserId = async (
  symbol,
  quantity,
  price,
  userid
) => {
  const dbResponse = await pool.query(
    'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) - (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity - EXCLUDED.quantity), quantity = currentHoldings.quantity - EXCLUDED.quantity RETURNING *',
    [symbol, quantity, price, userid]
  );

  return dbResponse.rows;
};

module.exports = {
  getCurrentHoldingByUserId,
  createOrUpdateBuyingHoldingByUserId,
  createOrUpdateSellingHoldingByUserId,
  searchExistingHoldingByUserId,
};
