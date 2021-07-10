const {
  createOrUpdateBuyingHoldingByUserId,
  updateSellingHoldingByUserId,
  getCurrentHoldingByUserIdandSymbol,
  deleteHoldingByUserId,
} = require('../../database/dbCurrentHolding');
jest.mock('../../database/dbCurrentHolding');

const {
  getCashBalanceByUserId,
  updateCashBalanceByUserId,
} = require('../../database/dbCashBalance');
jest.mock('../../database/dbCashBalance');

const transactionsService = require('../../services/transactionsService');

describe('Transactions Service', () => {
  describe('Buying Transactions', () => {
    test('should process buying transaction if cashBalance > purchasing value', () =>
      async () => {
        const mockReqBody = {
          symbol: 'XXX',
          type: 'buy',
          quantity: 1,
          price: 20,
          userid: 'id123',
        };
        const spy = jest.spyOn('updateCashBalanceByUserId');

        getCashBalanceByUserId.mockReturnValue({ amount: 30 });

        await transactionsService.buyingTransaction(mockReqBody);

        await expect(async () => {
          await transactionsService.buyingTransaction(mockReqBody);
        }).resolves.not.toThrow();

        expect(spy).toHaveBeenCalledTimes(1);
      });

    // test('Should throw error if cashBalance < purchasing value', async () => {
    //   const mockReqBody = {
    //     quantity: 1,
    //     price: 20,
    //   };

    //   getCashBalanceByUserId.mockReturnValue({ amount: 10 });

    //   try {
    //     await transactionsService.buyingTransaction(mockReqBody);
    //   } catch (e) {
    //     expect(e).toEqual(new Error('not enough cash to buy'));
    //   }
    // });
  });
});
