const axios = require('axios');

function formatNum(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const createStockModel = (stock) => {
  stock.holdingValue = Number(stock.latestPrice) * Number(stock.quantity);
  stock.holdingCost = Number(stock.purchaseprice) * Number(stock.quantity);
  stock.gainLoss = stock.holdingValue - stock.holdingCost;
};

const mappedStock = (arrOfStocks, arrOfPrices) => {
  arrOfStocks.map((item, i) => {
    Object.assign(item, { latestPrice: `${arrOfPrices[i]}` });
    return createStockModel(item);
  });

  return arrOfStocks;
};

const createOrderModel = (order) => {
  order.value = Number(order.quantity) * Number(order.price);
  return order;
};

const calculateHoldingValue = (array) => {
  const totalHoldingCost = array
    .map((item) => Number(item.quantity) * Number(item.purchaseprice))
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const totalHoldingValue = array
    .map((item) => Number(item.quantity) * Number(item.latestPrice))
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const gainLoss = totalHoldingValue - totalHoldingCost;

  return {
    totalValue: formatNum(totalHoldingValue),
    gainLoss: formatNum(gainLoss),
  };
};

const calculateCashAvailable = (array) => {
  if (!array) return;

  const cashAvailableToTrade = array
    .map((t) => Number(t.amount))
    .reduce((acc, cur) => acc + cur, 0);

  return cashAvailableToTrade;
};

const fetchStockLatestPrices = async (array) => {
  const mappedPromises = array.map((item) =>
    axios
      .get(
        //`https://cloud.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.IEX_API_TOKEN}`
        `https://sandbox.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.SANDBOX_IEX_API_TOKEN}`
      )
      .then((data) => data.data)
      .catch()
  );

  const latestPrices = await Promise.all(mappedPromises).then((response) => {
    return response.map((item) => item.quote.latestPrice);
  });

  return latestPrices;
};

module.exports = {
  formatNum,
  createStockModel,
  calculateCashAvailable,
  createOrderModel,
  fetchStockLatestPrices,
  mappedStock,
  calculateHoldingValue,
};
