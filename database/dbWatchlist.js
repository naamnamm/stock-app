const pool = require('./dbPool');

const getWatchlistByUserId = async (userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM watchlists WHERE user_id::text = $1',
    [userid]
  );

  return dbResponse.rows;
};

const getWatchlistBySymbolAndUserId = async (symbol, userid) => {
  const dbResponse = await pool.query(
    'SELECT * FROM watchlists WHERE symbol = $1 AND user_id::text = $2',
    [symbol, userid]
  );

  return dbResponse.rows;
};

const createWatchlist = async (symbol, userid) => {
  await pool.query('INSERT INTO watchlists (symbol, user_id) VALUES ($1, $2)', [
    symbol,
    userid,
  ]);
};

const deleteWatchlist = async (stockid, userid) => {
  await pool.query(
    'DELETE FROM watchlists WHERE id::text = $1 AND user_id::text = $2',
    [stockid, userid]
  );
};

module.exports = {
  getWatchlistByUserId,
  getWatchlistBySymbolAndUserId,
  createWatchlist,
  deleteWatchlist,
};
