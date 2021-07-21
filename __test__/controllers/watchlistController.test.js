const { getWatchlistByUserId } = require('../../database/dbWatchlist');
// const dbUser = require('../../database/dbUser');
jest.mock('../../database/dbWatchlist');

const watchlistService = require('../../services/watchlistService');
jest.mock('../../services/watchlistService');

const watchlistController = require('../../controllers/watchlistController');

const request = { params: { userid: 'id123', selectedStock: 'SYMBOL' } };

const response = {
  send: jest.fn(),
  statusCode: 201,
  status: jest.fn((code) => {
    statusCode = code;
    return response;
  }),
};

describe('Watchlist Controller', () => {
  describe('get Watchlist user id', () => {
    test('should return Watchlist', async () => {
      const watchlist = [
        { userid: 'id123', symbol: 'SYMBOL1' },
        { userid: 'id123', symbol: 'SYMBOL2' },
      ];

      getWatchlistByUserId.mockReturnValue(watchlist);

      await watchlistController.get(request, response);

      expect(response.send).toHaveBeenCalledWith(watchlist);
    });

    test('Should throw error if no currentHoldings', async () => {
      getWatchlistByUserId.mockImplementation(() => {
        const error = new Error('no watchlist found');
        throw error;
      });

      try {
        await watchlistController.get(request, response);
      } catch (e) {
        expect(e).toMatch('error');
      }
    });
  });

  describe('post Watchlist by userid and symbol', () => {
    // test('should return currentHolding', async () => {
    //   const mockHolding = { userid: 'id123', symbol: 'SYMBOL' };
    //   currentHoldingService.getHoldingByStockSymbol.mockReturnValue(
    //     mockHolding
    //   );
    //   await currentHoldingController.getCurrentHoldingByStockSymbol(
    //     request,
    //     response
    //   );
    //   expect(response.send).toHaveBeenCalledWith(mockHolding);
    // });
    // test('Should throw error if no currentHoldings', async () => {
    //   currentHoldingService.getHoldingByStockSymbol.mockImplementation(() => {
    //     const error = new Error('no currentHolding found');
    //     throw error;
    //   });
    //   try {
    //     await currentHoldingController.getCurrentHoldingByStockSymbol(
    //       request,
    //       response
    //     );
    //   } catch (e) {
    //     expect(e).toMatch('error');
    //   }
    // });
  });
  describe('delete Watchlist by userid and symbol', () => {
    // test('should return updated Watchlist', async () => {
    //   const mockHolding = { userid: 'id123', symbol: 'SYMBOL' };
    //   currentHoldingService.getHoldingByStockSymbol.mockReturnValue(
    //     mockHolding
    //   );
    //   await currentHoldingController.getCurrentHoldingByStockSymbol(
    //     request,
    //     response
    //   );
    //   expect(response.send).toHaveBeenCalledWith(mockHolding);
    // });
    // test('Should throw error if no currentHoldings', async () => {
    //   currentHoldingService.getHoldingByStockSymbol.mockImplementation(() => {
    //     const error = new Error('no currentHolding found');
    //     throw error;
    //   });
    //   try {
    //     await currentHoldingController.getCurrentHoldingByStockSymbol(
    //       request,
    //       response
    //     );
    //   } catch (e) {
    //     expect(e).toMatch('error');
    //   }
    // });
  });
});
