const currentHoldingService = require('../services/currentHoldingService');

const getCurrentHoldings = async (req, res) => {
  const { userid } = req.params;

  try {
    const currentHoldings = await currentHoldingService.getHoldings(userid);
    res.send(currentHoldings);
  } catch (error) {
    res.status(error.status).send({ errorMessage: error.message });
  }
};

const getCurrentHoldingByStockSymbol = async (req, res) => {
  const { userid, selectedStock } = req.params;

  try {
    const currentHolding = await currentHoldingService.getHoldingByStockSymbol(
      userid,
      selectedStock
    );

    res.send(currentHolding);
  } catch (error) {
    console.log('error :>> ', error);
    console.log('typeof :>> ', typeof error);
    res.status(error.status).send({ errorMessage: error.message });
  }
};

module.exports = { getCurrentHoldings, getCurrentHoldingByStockSymbol };
