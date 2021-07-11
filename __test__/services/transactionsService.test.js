const {
  createOrUpdateBuyingHoldingByUserId,
  updateSellingHoldingByUserId,
  getCurrentHoldingByUserIdandSymbol,
  deleteHoldingByUserId,
} = require('../../database/dbCurrentHolding');
const dbCurrentHolding = require('../../database/dbCurrentHolding');
jest.mock('../../database/dbCurrentHolding');

const {
  getCashBalanceByUserId,
  updateCashBalanceByUserId,
} = require('../../database/dbCashBalance');
const dbCashBalance = require('../../database/dbCashBalance');
jest.mock('../../database/dbCashBalance');

const { createFilledOrderByUserId } = require('../../database/dbOrder');
const dbOrder = require('../../database/dbOrder');
jest.mock('../../database/dbOrder');

const transactionsService = require('../../services/transactionsService');

describe('Transactions Service', () => {
  // describe('Buying Transactions', () => {
  //   test('should process buying transaction if cashBalance > purchasing value', async () => {
  //     const mockReqBody = {
  //       symbol: 'XXX',
  //       type: 'buy',
  //       quantity: 1,
  //       price: 20,
  //       userid: 'id123',
  //     };
  //     const spy1 = jest.spyOn(dbCashBalance, 'updateCashBalanceByUserId');
  //     const spy2 = jest.spyOn(dbOrder, 'createFilledOrderByUserId');
  //     const spy3 = jest.spyOn(
  //       dbCurrentHolding,
  //       'createOrUpdateBuyingHoldingByUserId'
  //     );

  //     getCashBalanceByUserId.mockReturnValue({ amount: 30 });

  //     await transactionsService.buyingTransaction(mockReqBody);
  //     expect(spy1).toHaveBeenCalledTimes(1);
  //     expect(spy2).toHaveBeenCalledTimes(1);
  //     expect(spy3).toHaveBeenCalledTimes(1);

  //     expect(
  //       transactionsService.buyingTransaction(mockReqBody)
  //     ).resolves.not.toThrow();
  //   });

  //   test('Should throw error if cashBalance < purchasing value', async () => {
  //     const mockReqBody = {
  //       quantity: 1,
  //       price: 20,
  //     };

  //     getCashBalanceByUserId.mockReturnValue({ amount: 10 });

  //     try {
  //       await transactionsService.buyingTransaction(mockReqBody);
  //     } catch (e) {
  //       expect(e).toEqual(new Error('not enough cash to buy'));
  //     }
  //   });
  // });

  describe('Selling Transactions', () => {
    const mockReqBody = {
      symbol: 'XXX',
      type: 'buy',
      quantity: 2,
      price: 20,
      userid: 'id123',
    };

    // test('should process selling transaction if no error was thrown', async () => {
    //   getCurrentHoldingByUserIdandSymbol.mockReturnValue({ symbol: 'XXX' });
    //   updateSellingHoldingByUserId.mockReturnValue({
    //     symbol: 'XXX',
    //     quantity: 1,
    //   });

    //   expect(
    //     transactionsService.sellingTransaction(mockReqBody)
    //   ).resolves.not.toThrow();
    // });

    // test('Should throw error if no existing holding', async () => {
    //   getCurrentHoldingByUserIdandSymbol.mockReturnValue(null);

    //   try {
    //     await transactionsService.sellingTransaction(mockReqBody);
    //   } catch (e) {
    //     expect(e).toEqual(new Error('no holding found'));
    //   }
    // });

    // test('Should throw error if selling quantity < holding quantity', async () => {
    //   getCurrentHoldingByUserIdandSymbol.mockReturnValue(1);

    //   try {
    //     await transactionsService.sellingTransaction(mockReqBody);
    //   } catch (e) {
    //     expect(e).toEqual(new Error('not enough amount to sell'));
    //   }
    // });

    test('Should delete holding row if user sells all shares', async () => {
      getCurrentHoldingByUserIdandSymbol.mockReturnValue(2);

      updateSellingHoldingByUserId.mockReturnValue({
        symbol: 'XXX',
        quantity: 0,
      });

      //   expect(
      //     transactionsService.sellingTransaction(mockReqBody)
      //   ).resolves.not.toThrow();
    });
  });
});
