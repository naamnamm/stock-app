import React from 'react';

function formatNumber(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export const calculateValue = (array) => {
  const eachHoldingCost = array.map(
    (item) => Number(item.quantity) * Number(item.purchaseprice)
  );
  const totalCost = eachHoldingCost.reduce((a, b) => {
    return a + b;
  }, 0);
  //console.log(total);

  const eachHoldingValue = array.map(
    (item) => Number(item.quantity) * Number(item.latestPrice)
  );
  const totalValue = eachHoldingValue.reduce((a, b) => {
    return a + b;
  }, 0);

  const gainLoss = totalValue - totalCost;
  console.log(totalValue, gainLoss);

  return {
    totalValue: formatNumber(totalValue),
    gainLoss: formatNumber(gainLoss),
  };
};
