const {
  getCurrentHoldingByUserId,
  getCurrentHoldingByUserIdandSymbol,
} = require('../database/dbCurrentHolding');
const functions = require('../utils/functions');

const currentHoldings = async (userid) => {
  const currentHoldings = await getCurrentHoldingByUserId(userid);

  if (!currentHoldings) {
    const error = new Error('no currentHoldings found');
    error.status = 404;
    throw error;
  }

  const latestPrices = await functions.fetchStockLatestPrices(currentHoldings);

  currentHoldings.map((item, i) => {
    Object.assign(item, { latestPrice: `${latestPrices[i]}` });
    return functions.createStockModel(item);
  });

  const holdingsValue = functions.calculateHoldingValue(currentHoldings);

  return { currentHoldings, holdingsValue };
};

const currentHoldingByStockSymbol = async (userid, selectedStock) => {
  const currentHolding = await getCurrentHoldingByUserIdandSymbol(
    userid,
    selectedStock
  );

  // const currentHolding = currentHoldings.find(
  //   (stock) => stock.symbol === selectedStock
  // );

  if (!currentHolding) {
    const error = new Error('no currentHolding found');
    error.status = 404;
    throw error;
  }

  return currentHolding;
};

module.exports = { currentHoldings, currentHoldingByStockSymbol };
