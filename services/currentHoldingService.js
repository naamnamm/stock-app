const { getCurrentHoldingByUserId } = require('../database/dbCurrentHolding');
const functions = require('../utils/functions');

const currentHolding = async (userid) => {
  const currentHoldings = await getCurrentHoldingByUserId(userid);

  if (currentHoldings) {
    const latestPrices = await functions.fetchStockLatestPrices(
      currentHoldings
    );

    // how should I test this?

    currentHoldings.map((item, i) => {
      Object.assign(item, { latestPrice: `${latestPrices[i]}` });
      return functions.createStockModel(item);
    });
  }
  const holdingsValue = functions.calculateHoldingValue(currentHoldings);

  return { currentHoldings, holdingsValue };
};

const selectedStock = async (userid, selectedStock) => {
  const currentHoldings = await getCurrentHoldingByUserId(userid);

  const position = currentHoldings.find(
    (stock) => stock.symbol === selectedStock
  );

  if (!position) {
    return;
  }

  return position.quantity;
};

module.exports = { currentHolding, selectedStock };
