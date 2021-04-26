const {
  getWatchlistByUserId,
  getWatchlistBySymbolAndUserId,
  createWatchlist,
  deleteWatchlist,
} = require('../database/dbWatchlist');

const get = async (req, res) => {
  const { userid } = req.params;

  res.send(await getWatchlistByUserId(userid));
  //we don't need to check if watchlist exist?
  // if (watchlist) {
  //   res.send(JSON.stringify(watchlist.rows));
  // }
};

const post = async (req, res) => {
  const { symbol, userid } = req.body;
  const error = [];

  const useridAndSymbolMatch = await getWatchlistBySymbolAndUserId(
    symbol,
    userid
  );

  if (useridAndSymbolMatch.length > 0) {
    error.push({ message: 'Symbol alreay exists in watchlist.' });
  }

  if (error.length > 0) {
    return res.status(401).send(error);
  }

  if (useridAndSymbolMatch.length === 0) {
    // this used to be else
    await createWatchlist(symbol, userid);

    const watchlists = await getWatchlistByUserId(userid);
    res.send(watchlists);
  }
};

const deleteFn = async (req, res) => {
  const { stockid, userid } = req.params;

  await deleteWatchlist(stockid, userid);

  const updatedWatchlist = await getWatchlistByUserId(userid);

  res.send(updatedWatchlist);
};

module.exports = { post, get, deleteFn };
