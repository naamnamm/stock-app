const { UserToken, createToken } = require('../../utils/authToken');
jest.mock('../../utils/authToken');

const transactionsService = require('../../services/transactionsService');
jest.mock('../../services/transactionsService');

const transactionsController = require('../../controllers/transactionsController');

const getMockedResponse = () => {
  const response = {
    statusCode: 200,
    send: jest.fn((obj) => obj),
    status: jest.fn((code) => {
      statusCode = code;
      return response;
    }),
  };

  return response;
};

const response = getMockedResponse();

describe('Transaction Controller', () => {
  describe('Buying transactions', () => {
    const request = { body: { type: 'buy' } };

    test('transactionsService.buyingTransaction should be called', async () => {
      await transactionsController.post(request, response);

      const spy = jest.spyOn(transactionsService, 'buyingTransaction');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Reponse should be called with success message', async () => {
      const successMsg = { successMsg: `Your buying order has been filled` };

      transactionsService.buyingTransaction.mockReturnValue(successMsg);

      await transactionsController.post(request, response);

      expect(response.send).toHaveBeenCalledWith(successMsg);
    });

    test('Should throw error if error', async () => {
      transactionsService.buyingTransaction.mockImplementation(() => {
        throw Error;
      });

      try {
        await transactionsController.post(request, response);
      } catch (e) {
        expect(e).toEqual('error');
      }
    });
  });

  describe('Selling transactions', () => {
    const request = { body: { type: 'sell' } };

    test('transactionsService.sellingTransaction should be called', async () => {
      await transactionsController.post(request, response);

      const spy = jest.spyOn(transactionsService, 'sellingTransaction');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Reponse should be called with success message', async () => {
      const successMsg = { successMsg: `Your selling order has been filled` };

      transactionsService.sellingTransaction.mockReturnValue(successMsg);

      await transactionsController.post(request, response);

      expect(response.send).toHaveBeenCalledWith(successMsg);
    });

    test('Should throw error if error', async () => {
      transactionsService.sellingTransaction.mockImplementation(() => {
        throw Error;
      });

      try {
        await transactionsController.post(request, response);
      } catch (e) {
        expect(e).toEqual('error');
      }
    });
  });
});
