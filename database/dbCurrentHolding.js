const pool = require('../database/dbPool');

const getCurrentHoldingByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM currentHoldings WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

module.exports = { getCurrentHoldingByUserId };
