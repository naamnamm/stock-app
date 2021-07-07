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
    test('should return success message for buying transaction', async () => {
      updateCashBalanceByUserId.mockReturnValue(null);
      createFilledOrderByUserId.mockReturnValue();
      createOrUpdateBuyingHoldingByUserId.mockReturnValue;

      const username = 'user123';
      const password = 'pass123';
      const spy = jest.spyOn(signupUserService, 'signupUser');

      await signupUserService.signupUser(username, password);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if username match', async () => {
      const username = 'user123';
      const password = 'pass123';

      getUserByUsername.mockReturnValue({ user: 'user123' });

      try {
        await signupUserService.signupUser(username, password);
      } catch (e) {
        expect(e).toEqual(new Error('Username already exist'));
        expect(e.status).toEqual(409);
      }
    });
  });
});
