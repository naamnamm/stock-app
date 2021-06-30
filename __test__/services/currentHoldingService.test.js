const {
  getCurrentHoldingByUserId,
  getCurrentHoldingByUserIdandSymbol,
} = require('../../database/dbCurrentHolding');
jest.mock('../../database/dbCurrentHolding');

const {
  fetchStockLatestPrices,
  calculateHoldingValue,
} = require('../../utils/functions');
jest.mock('../../utils/functions');

const currentHoldingService = require('../../services/currentHoldingService');

describe('Current Holding Service', () => {
  describe('Get CurrentHoldings', () => {
    test('Should return currentHoldings data', async () => {
      const userid = 'id123';

      getCurrentHoldingByUserId.mockReturnValue([{}]);
      fetchStockLatestPrices.mockReturnValue([10]);
      calculateHoldingValue.mockReturnValue(10);

      const result = await currentHoldingService.getHoldings(userid);

      expect(result.holdingsValue).toEqual(10);
      expect(result.currentHoldings[0]).toHaveProperty('latestPrice');
      expect(result.currentHoldings[0].latestPrice).toEqual('10');
    });

    test('Should throw error if there is no currentHoldings', async () => {
      const userid = 'id123';

      getCurrentHoldingByUserId.mockReturnValue(null);

      await expect(async () => {
        await currentHoldingService.getHoldings(userid);
      }).rejects.toEqual(new Error('no currentHoldings found'));
    });
  });

  describe('Get CurrentHolding by stock symbol', () => {
    test('Should return currentHolding quantity if symbol match', async () => {
      const userid = 'id123';
      const stockSymbol = 'SYMBOL';

      getCurrentHoldingByUserIdandSymbol.mockReturnValue([{ quantity: 1 }]);

      const result = await currentHoldingService.getHoldingByStockSymbol(
        userid,
        stockSymbol
      );

      expect(result[0]).toHaveProperty('quantity');
      expect(result[0].quantity).toEqual(1);
    });

    // test('Should throw error if there is no currentHoldings', async () => {
    //   const userid = 'id123';

    //   getCurrentHoldingByUserId.mockReturnValue(null);

    //   await expect(async () => {
    //     await currentHoldingService.getHoldings(userid);
    //   }).rejects.toEqual(new Error('no currentHoldings found'));
    // });
  });
});

// const mockCurrentHolding = {
//   id: 'id123',
//   symbol: 'symbol123',
//   quantity: '1',
//   purchaseprice: '1',
//   user_id: 'user123',
//   latestPrices: 2,
//   holdingValue: '2',
//   holdingCost: '1',
//   gainLoss: '1',
// };
