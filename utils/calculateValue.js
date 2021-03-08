function formatNum(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const createStockModel = (stock) => {
  stock.holdingValue = Number(stock.latestPrice) * Number(stock.quantity);
  stock.holdingCost = Number(stock.purchaseprice) * Number(stock.quantity);
  stock.gainLoss = stock.holdingValue - stock.holdingCost;
};

const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

const getDays = (startDate) => {
  const start = new Date(startDate); //clone
  const end = new Date(); //clone
  let dayCount = 0;

  while (end > start) {
    dayCount++;
    start.setDate(start.getDate() + 1);
  }

  return dayCount;
};

module.exports = {
  getDatesBetweenDates,
  getDays,
  formatNum,
  createStockModel,
};

//https://sandbox.iexapis.com/stable/stock/twtr/chart/10d?token=Tsk_66820f5895ad4695ba96beee7925717b
