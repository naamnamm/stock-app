const {
  getCashTransferByUserId,
  createCashTransferByUserId,
} = require('../../database/dbCashTransfer');
jest.mock('../../database/dbCashTransfer');

//const { updateCashBalanceByUserId } = require('../../database/dbCashTransfer');
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
      const mockCashTransfer = { userid: 'id123', amount: 10 };

      getCashTransferByUserId.mockReturnValue(mockCashTransfer);

      const mockSendObject = { msg: 'success', transaction: mockCashTransfer };

      await cashTransferController.post(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.send).toHaveBeenCalledWith(mockSendObject);
    });

    test('Should throw error', async () => {
      createCashTransferByUserId.mockImplementation(() => {
        throw new Error();
      });

      expect(
        cashTransferController.post(request, response)
      ).rejects.toThrowError();
    });
  });
});
