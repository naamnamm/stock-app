const pool = require('./dbPool');

const getCashTransferByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM cash_transfer WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

const createCashTransferByUserId = async (type, amount, userid) => {
  await pool.query(
    'INSERT INTO cash_transfer (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
    [type, amount, userid]
  );
};

module.exports = { getCashTransferByUserId, createCashTransferByUserId };
