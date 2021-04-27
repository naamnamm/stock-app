const {
  getWatchlistBySymbolAndUserId,
  createWatchlist,
  getWatchlistByUserId,
} = require('../database/dbWatchlist');

const existingWatchlist = async (symbol, userid) => {
  const useridAndSymbolMatch = await getWatchlistBySymbolAndUserId(
    symbol,
    userid
  );

  if (useridAndSymbolMatch.length > 0) {
    const error = new Error('Symbol already exists in watchlist.');
    error.status = 401;
    throw error;
  } else {
    await createWatchlist(symbol, userid);
    const watchlist = await getWatchlistByUserId(userid);

    return watchlist;
  }
};

module.exports = { existingWatchlist };
