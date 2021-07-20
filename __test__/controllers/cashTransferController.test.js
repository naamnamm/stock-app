const {
  getCashTransferByUserId,
  createCashTransferByUserId,
} = require('../../database/dbCashTransfer');
jest.mock('../../database/dbCashTransfer');

const { createCashTransferByUserId } = require('../../database/dbCashTransfer');
jest.mock('../../database/dbCashBalance');

const cashTransferController = require('../../controllers/cashTransferController');

const getMockedResponse = () => {
  const response = {
    statusCode: 201,
    send: jest.fn((obj) => obj),
    status: jest.fn((code) => {
      statusCode = code;
      return response;
    }),
  };

  return response;
};

const request = {
  body: { user: { id: 'id123' }, amount: 10, type: 'transfer-in' },
  params: { userid: 'id123' },
};
const response = getMockedResponse();

describe('Cash Transfer Controller', () => {
  describe('get cash transfer by userid', () => {
    test('should return cash transfer', async () => {
      const cashTransfer = { userid: 'id123', cashTransfer: {} };
      getCashTransferByUserId.mockReturnValue(cashTransfer);

      await cashTransferController.get(request, response);

      expect(response.send).toHaveBeenCalledWith(cashTransfer);
    });
  });

  describe('post cash transfer by userid', () => {
    test('should post cash transfer', async () => {
      getCashTransferByUserId.mockReturnValue(cashTransfer);

      await cashTransferController.post(request, response);

      expect(response.send).toHaveBeenCalledWith(cashTransfer);
    });

    // test('Should throw error if cashTransfer is undefined', async () => {

    //   getCashTransferByUserId.mockreturnValue(undefined);

    //   expect(cashTransferController.get(request, response)).toThrowError();

    // });
  });
});
