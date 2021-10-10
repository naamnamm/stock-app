const {
  getCurrentHoldingByUserId,
  getCurrentHoldingByUserIdandSymbol,
} = require('../database/dbCurrentHolding');
const functions = require('../utils/functions');

const getHoldings = async (userid) => {
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

const getHoldingByStockSymbol = async (userid, stockSymbol) => {
  const currentHolding = await getCurrentHoldingByUserIdandSymbol(
    userid,
    stockSymbol
  );

  // if (!currentHolding) {
  //   const error = new Error('no currentHolding found');
  //   error.status = 404;
  //   throw error;
  // }

  if (!currentHolding) return { quantity: 0 };

  return currentHolding;
};

module.exports = { getHoldings, getHoldingByStockSymbol };
