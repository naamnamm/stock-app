const {
  getCurrentHoldingByUserId,
  getCurrentHoldingByUserIdandSymbol,
} = require('../database/dbCurrentHolding');
const functions = require('../utils/functions');

const getHoldings = async (userid) => {
  // 1. mock this array
  const currentHoldings = await getCurrentHoldingByUserId(userid);
  // make [{}]

  if (!currentHoldings) {
    // [10]
    const error = new Error('no currentHoldings found');
    error.status = 404;
    throw error;
  }

  const latestPrices = await functions.fetchStockLatestPrices(currentHoldings);

  //check to see if each item has a property called latestPrices
  currentHoldings.map((item, i) => {
    Object.assign(item, { latestPrice: `${latestPrices[i]}` });
    return functions.createStockModel(item); // this can be test later
  });

  const holdingsValue = functions.calculateHoldingValue(currentHoldings);

  // test this
  return { currentHoldings, holdingsValue };
};

const getHoldingByStockSymbol = async (userid, stockSymbol) => {
  const currentHolding = await getCurrentHoldingByUserIdandSymbol(
    userid,
    stockSymbol
  );

  if (!currentHolding) {
    const error = new Error('no currentHolding found');
    error.status = 404;
    throw error;
  }

  return currentHolding;
};

module.exports = { getHoldings, getHoldingByStockSymbol };
