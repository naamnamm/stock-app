const currentHoldingService = require('../services/currentHoldingService');

const getCurrentHoldings = async (req, res) => {
  const { userid } = req.params;

  try {
    const currentHoldings = await currentHoldingService.currentHoldings(userid);
    res.send(currentHoldings);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({ errorMessage: error.message });
  }
};

const getCurrentHoldingByStockSymbol = async (req, res) => {
  const { userid, selectedStock } = req.params;

  const holdingQuantity =
    await currentHoldingService.currentHoldingByStockSymbol(
      userid,
      selectedStock
    );

  res.send(holdingQuantity);
};

module.exports = { getCurrentHoldings, getCurrentHoldingByStockSymbol };
