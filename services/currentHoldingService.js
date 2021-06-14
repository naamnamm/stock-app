const { getCurrentHoldingByUserId } = require('../database/dbCurrentHolding');
const axios = require('axios');
const functions = require('../utils/calculateValue');

const currentHolding = async (userid) => {
  const currentHoldings = await getCurrentHoldingByUserId(userid);

  console.log(currentHoldings);

  if (currentHoldings) {
    const latestPrices = await functions.fetchStockLatestPrices(
      currentHoldings
    );

    currentHoldings.map((item, i) => {
      Object.assign(item, { latestPrice: `${latestPrices[i]}` });
      return functions.createStockModel(item);
    });
  }

  console.log(currentHoldings);

  const holdingsValue = functions.calculateHoldingsValue(currentHoldings);

  return { currentHoldings, holdingsValue };
};

const selectedStock = async (userid, selectedStock) => {
  const currentHoldings = await getCurrentHoldingByUserId(userid);

  const position = currentHoldings.find(
    (stock) => stock.symbol === selectedStock
  );

  return position.quantity;
};

module.exports = { currentHolding, selectedStock };

// const fetchLatestPrices = currentHoldings.map((item) =>
//   axios
//     .get(
//       //`https://cloud.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.IEX_API_TOKEN}`
//       `https://sandbox.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.SANDBOX_IEX_API_TOKEN}`
//     )
//     .then((data) => data.data)
//     .catch()
// );

// const latestPrices = await Promise.all(fetchLatestPrices).then(
//   (response) => {
//     return response.map((item) => item.quote.latestPrice);
//   }
// );
