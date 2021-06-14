const axios = require('axios');

function formatNum(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const createStockModel = (stock) => {
  stock.holdingValue = Number(stock.latestPrice) * Number(stock.quantity);
  stock.holdingCost = Number(stock.purchaseprice) * Number(stock.quantity);
  stock.gainLoss = stock.holdingValue - stock.holdingCost;
};

const createOrderModel = (order) => {
  order.value = Number(order.quantity) * Number(order.price);
  return order;
};

const calculateHoldingsValue = (array) => {
  const eachHoldingCost = array.map(
    (item) => Number(item.quantity) * Number(item.purchaseprice)
  );
  const totalCost = eachHoldingCost.reduce((a, b) => {
    return a + b;
  }, 0);

  const eachHoldingValue = array.map(
    (item) => Number(item.quantity) * Number(item.latestPrice)
  );
  const totalValue = eachHoldingValue.reduce((a, b) => {
    return a + b;
  }, 0);

  const gainLoss = totalValue - totalCost;

  return {
    totalValue: formatNum(totalValue),
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

  console.log('latestprice', latestPrices);

  return latestPrices;
};

module.exports = {
  formatNum,
  createStockModel,
  calculateCashAvailable,
  calculateHoldingsValue,
  createOrderModel,
  fetchStockLatestPrices,
};
