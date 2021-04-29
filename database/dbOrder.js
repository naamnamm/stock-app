const pool = require('../database/dbPool');

const getOrderByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM orders WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

module.exports = { getOrderByUserId };
