const {
  getWatchlistBySymbolAndUserId,
  createWatchlist,
  getWatchlistByUserId,
} = require('../database/dbWatchlist');

const addWatchlist = async (symbol, userid) => {
  const useridAndSymbolMatch = await getWatchlistBySymbolAndUserId(
    symbol,
    userid
  );

  if (useridAndSymbolMatch) {
    const error = new Error('Symbol already exists in watchlist.');
    error.status = 409;
    throw error;
  }

  await createWatchlist(symbol, userid);
  const watchlist = await getWatchlistByUserId(userid);

  return watchlist;
};

module.exports = { addWatchlist };
