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

  //Do i need to test createWatchlist below?
  await createWatchlist(symbol, userid);

  const watchlist = await getWatchlistByUserId(userid);

  return watchlist;
};

module.exports = { addWatchlist };

// question: this is my watchlist service, here is how i test it.
// is there anything else I should be testing?
// Do i need to test createWatchlist below?
// await createWatchlist(symbol, userid);
