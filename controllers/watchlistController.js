const {
  getWatchlistByUserId,
  deleteWatchlist,
} = require('../database/dbWatchlist');
const watchlistService = require('../services/watchlistService');

const get = async (req, res) => {
  const { userid } = req.params;

  try {
    const watchlist = await getWatchlistByUserId(userid);
    res.send(watchlist);
  } catch (error) {
    throw error;
  }
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

  try {
    await deleteWatchlist(stockid, userid);

    const updatedWatchlist = await getWatchlistByUserId(userid);

    res.send(updatedWatchlist);
  } catch (error) {
    throw error;
  }
};

module.exports = { post, get, deleteFn };
