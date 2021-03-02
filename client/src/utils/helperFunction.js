import React from 'react';

export const calculateHoldingValue = (array) => {
  const eachHoldingCost = array.map(
    (item) => Number(item.quantity) * Number(item.purchaseprice)
  );
  const total = eachHoldingCost.reduce((a, b) => {
    return a + b;
  }, 0);
  console.log(total);
};
