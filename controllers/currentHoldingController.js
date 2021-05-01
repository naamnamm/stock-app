const currentHoldingService = require('../services/currentHoldingService');
const {
  getCurrentHoldingByUserId,
  selectedStock,
} = require('../database/dbCurrentHolding');

const get = async (req, res) => {
  const { userid } = req.params;

  const currentHoldings = await currentHoldingService.currentHolding(userid);
  res.send(currentHoldings);
};

const getBySelectedStock = async (req, res) => {
  const { userid, selectedStock } = req.params;

  const holdingQuantity = await currentHoldingService.selectedStock(
    userid,
    selectedStock
  );

  res.send(holdingQuantity);
};

module.exports = { get, getBySelectedStock };

//console.log(process.env.IEX_API_TOKEN);
// `https://sandbox.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.SANDBOX_IEX_API_TOKEN}`

// if (currentHoldings) {
//   const fetchLatestPrices = currentHoldings.map((item) =>
//     axios
//       .get(
//         `https://cloud.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.IEX_API_TOKEN}`
//       )
//       .then((data) => data.data)
//   );

//   const latestPrices = await Promise.all(fetchLatestPrices).then(
//     (response) => {
//       return response.map((item) => item.quote.latestPrice);
//     }
//   );

//   currentHoldings.map((item, i) => {
//     Object.assign(item, { latestPrice: `${latestPrices[i]}` });
//     return functions.createStockModel(item);
//   });
// }

// const holdingsValue = functions.calculateHoldingsValue(currentHoldings);

//  res.send({ currentHoldings: currentHoldings, holdingsValue });
// } catch (error) {
//   console.log(error);
// }

// try {
//   const currentHoldings = await getCurrentHoldingByUserId(userid);

//   const position = currentHoldings.find(
//     (stock) => stock.symbol === selectedStock
//   );

//   if (position) {
//     res.send(position.quantity);
//   } else {
//     res.send({ msg: 'no current position' });
//   }
// } catch (error) {
//   console.log(error);
// }
