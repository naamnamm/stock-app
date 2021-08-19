const functions = require('../../utils/functions');

test('format number 2 decimal point', () => {
  expect(functions.formatNum(1.234)).toEqual('1.23');
});

test('format stock model', () => {
  const mockedHolding = {
    symbol: 'XXX',
    quantity: 1,
    purchaseprice: 20,
    latestPrice: 30,
    userid: 'id123',
  };

  const result = functions.createStockModel(mockedHolding);

  expect(result.holdingValue).toEqual(30);
  expect(result.holdingCost).toEqual(20);
  expect(result.gainLoss).toEqual(10);
});

test('format order model', () => {
  const mockedOrder = {
    symbol: 'XXX',
    quantity: 2,
    price: 20,
    userid: 'id123',
  };

  const result = functions.createOrderModel(mockedOrder);

  expect(result.value).toEqual(40);
});
