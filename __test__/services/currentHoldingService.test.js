const {
  getCurrentHoldingByUserId,
} = require('../../database/dbCurrentHolding');
jest.mock('../../database/dbCurrentHolding');

const {
  fetchStockLatestPrices,
  createStockModel,
  calculateHoldingsValue,
} = require('../../utils/functions');
jest.mock('../../utils/functions');

const currentHoldingService = require('../../services/currentHoldingService');

describe('Current Holding Service', () => {
  describe('Get CurrentHolding', () => {
    test('Should return currentHolding data', async () => {
      const mockCurrentHolding = {
        id: 'id123',
        symbol: 'symbol123',
        quantity: '1',

        purchaseprice: '1',
        user_id: 'user123',
        latestPrices: 2,
        holdingValue: '2',
        holdingCost: '1',
        gainLoss: '1',
      };

      const mockCurrentHoldingValue = 2;

      const userid = 'id123';

      getCurrentHoldingByUserId.mockReturnValue({ id: 'id123' });
      fetchStockLatestPrices.mockReturnValue([2]);
      createStockModel.mockReturnValue({
        id: 'id123',
        symbol: 'symbol123',
        quantity: '1',
        purchaseprice: '1',
        user_id: 'user123',
        latestPrices: 2,
        holdingValue: '2',
        holdingCost: '1',
        gainLoss: '1',
      });
      calculateHoldingsValue.mockReturnValue(2);

      const result = await currentHoldingService.currentHolding(userid);

      expect(result.holdingsValue).toEqual(mockCurrentHoldingValue);
      expect(result.currentHoldings.latestPrices).toEqual(
        mockCurrentHolding.latestPrices
      );
      expect(result.currentHoldings.symbol).toEqual(mockCurrentHolding.symbol);
    });
  });
});
