import React from 'react';

export function formatNumber(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export const calculateValue = (array) => {
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
    totalValue: formatNumber(totalValue),
    gainLoss: formatNumber(gainLoss),
  };
};

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

export function getDates(startDate, stopDate) {
  console.log(startDate, stopDate);
  // to get array of dates [the date of purchase, today]
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

//get array of date = label

// if (today - created_at) > 1
//

export const getStartDate = (array) => {
  console.log(array);
  if (!array) {
    return;
  } else {
    return array[0].created_at;
  }
};
