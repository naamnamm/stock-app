const {
  getWatchlistByUserId,
  deleteWatchlist,
} = require('../database/dbWatchlist');
const watchlistService = require('../services/watchlistService');

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

  try {
    const watchlist = await watchlistService.addWatchlist(symbol, userid);
    res.send(watchlist);
  } catch (error) {
    res.status(error.status).send({ errorMessage: error.message });
  }
};

const deleteFn = async (req, res) => {
  const { stockid, userid } = req.params;

  await deleteWatchlist(stockid, userid);

  const updatedWatchlist = await getWatchlistByUserId(userid);

  res.send(updatedWatchlist);
};

module.exports = { post, get, deleteFn };
