const axios = require('axios');

function formatNum(num) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const createStockModel = (stock) => {
  stock.holdingValue = Number(stock.latestPrice) * Number(stock.quantity);
  stock.holdingCost = Number(stock.purchaseprice) * Number(stock.quantity);
  stock.gainLoss = stock.holdingValue - stock.holdingCost;
  return stock;
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

const getPrice = (item) => {
  return axios.get(
    `https://financialmodelingprep.com/api/v3/profile/${item.symbol}?apikey=${process.env.apikey}`

  );
};

const fetchStockLatestPrices = async (array) => {
  const mappedPromises = array.map((item) =>
    getPrice(item)
      .then((res) => res.data)
      .catch()
  );

  const latestPrices = await Promise.all(mappedPromises).then((response) => {
    return response.map((item) => item[0].price);
  });

  return latestPrices;
};

module.exports = {
  formatNum,
  createStockModel,
  createOrderModel,
  fetchStockLatestPrices,
  calculateHoldingValue,
};
