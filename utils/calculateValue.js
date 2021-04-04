function formatNum(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const createStockModel = (stock) => {
  stock.holdingValue = Number(stock.latestPrice) * Number(stock.quantity);
  stock.holdingCost = Number(stock.purchaseprice) * Number(stock.quantity);
  stock.gainLoss = stock.holdingValue - stock.holdingCost;
};

const createOrderModel = (order) => {
  //console.log(order);
  order.value = Number(order.quantity) * Number(order.price);
  console.log(order);
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
  //console.log(totalValue, gainLoss);

  return {
    totalValue: formatNum(totalValue),
    gainLoss: formatNum(gainLoss),
  };
};

const calculateCashAvailable = (arr) => {
  const cashAvailableToTrade = arr.rows
    .map((t) => Number(t.amount))
    .reduce((acc, cur) => acc + cur, 0);

  return cashAvailableToTrade;
};

const generateChartData = () => {};

module.exports = {
  formatNum,
  createStockModel,
  calculateCashAvailable,
  calculateHoldingsValue,
  createOrderModel,
};

//https://sandbox.iexapis.com/stable/stock/twtr/chart/10d?token=Tsk_66820f5895ad4695ba96beee7925717b

// const getDatesBetweenDates = (startDate, endDate) => {
//   let dates = [];
//   //to avoid modifying the original date
//   const theDate = new Date(startDate);
//   while (theDate < endDate) {
//     dates = [...dates, new Date(theDate)];
//     theDate.setDate(theDate.getDate() + 1);
//   }
//   return dates;
// };

// const getDays = (startDate) => {
//   const start = new Date(startDate); //clone
//   const end = new Date(); //clone
//   let dayCount = 0;

//   while (end > start) {
//     dayCount++;
//     start.setDate(start.getDate() + 1);
//   }

//   return dayCount;
// };
