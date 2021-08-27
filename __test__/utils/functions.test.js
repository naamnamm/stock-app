const functions = require('../../utils/functions');
jest.mock('../../utils/functions');

const axios = require('axios');
jest.mock('axios');

//issue with testing
describe('getting latest prices', () => {
  test('Should return an array of latest prices', async () => {
    const mockedCurrentHoldings = [{ symbol: 'AAA' }];

    const response = { data: { quote: { latestPrice: 10 } } };

    //axios.get.mockImplementationOnce(() => Promise.resolve(response));

    functions.getPrice.mockImplementation(() => response);

    const result = await functions.fetchStockLatestPrices(
      mockedCurrentHoldings
    );

    expect(result.latestPrice).toEqual(10);
  });
});

// test('format number 2 decimal point', () => {
//   expect(functions.formatNum(1.234)).toEqual('1.23');
// });

// test('format stock model', () => {
//   const mockedHolding = {
//     symbol: 'XXX',
//     quantity: 1,
//     purchaseprice: 20,
//     latestPrice: 30,
//     userid: 'id123',
//   };

//   const result = functions.createStockModel(mockedHolding);

//   expect(result.holdingValue).toEqual(30);
//   expect(result.holdingCost).toEqual(20);
//   expect(result.gainLoss).toEqual(10);
// });

// test('format order model', () => {
//   const mockedOrder = {
//     symbol: 'XXX',
//     quantity: 2,
//     price: 20,
//     userid: 'id123',
//   };

//   const result = functions.createOrderModel(mockedOrder);

//   expect(result.value).toEqual(40);
// });

// test('format holding value calculation', () => {
//   const mockedHoldings = [
//     {
//       symbol: 'AAA',
//       quantity: 1,
//       purchaseprice: 10,
//       latestPrice: 15,
//       userid: 'id123',
//     },
//     {
//       symbol: 'BBB',
//       quantity: 1,
//       purchaseprice: 20,
//       latestPrice: 30,
//       userid: 'id123',
//     },
//   ];

//   const result = functions.calculateHoldingValue(mockedHoldings);

//   expect(result.totalValue).toEqual('45.00');
//   expect(result.gainLoss).toEqual('15.00');
// });
