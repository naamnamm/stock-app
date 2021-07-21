const currentHoldingService = require('../../services/currentHoldingService');
jest.mock('../../services/currentHoldingService');

const currentHoldingController = require('../../controllers/currentHoldingController');

const request = { params: { userid: 'id123', selectedStock: 'SYMBOL' } };

const response = {
  send: jest.fn(),
  statusCode: 201,
  status: jest.fn((code) => {
    statusCode = code;
    return response;
  }),
};

describe('Current Holding Controller', () => {
  describe('getCurrentHoldings by user id', () => {
    test('should return currentHoldings', async () => {
      const mockHoldings = [
        { userid: 'id123', symbol: 'SYMBOL1' },
        { userid: 'id123', symbol: 'SYMBOL2' },
      ];

      currentHoldingService.getHoldings.mockReturnValue(mockHoldings);

      await currentHoldingController.getCurrentHoldings(request, response);

      expect(response.send).toHaveBeenCalledWith(mockHoldings);
    });

    test('Should throw error if no currentHoldings', async () => {
      currentHoldingService.getHoldings.mockImplementation(() => {
        const error = new Error('no currentHoldings found');
        throw error;
      });

      try {
        await currentHoldingController.getCurrentHoldings(request, response);
      } catch (e) {
        expect(e).toMatch('error');
      }
    });
  });

  describe('getCurrentHoldingByStockSymbol', () => {
    test('should return currentHolding', async () => {
      const mockHolding = { userid: 'id123', symbol: 'SYMBOL' };

      currentHoldingService.getHoldingByStockSymbol.mockReturnValue(
        mockHolding
      );

      await currentHoldingController.getCurrentHoldingByStockSymbol(
        request,
        response
      );

      expect(response.send).toHaveBeenCalledWith(mockHolding);
    });

    test('Should throw error if no currentHoldings', async () => {
      currentHoldingService.getHoldingByStockSymbol.mockImplementation(() => {
        const error = new Error('no currentHolding found');
        throw error;
      });

      try {
        await currentHoldingController.getCurrentHoldingByStockSymbol(
          request,
          response
        );
      } catch (e) {
        expect(e).toMatch('error');
      }
    });
  });
});
