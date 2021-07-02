const {
  getWatchlistBySymbolAndUserId,
  getWatchlistByUserId,
  createWatchlist,
} = require('../../database/dbWatchlist');
jest.mock('../../database/dbWatchlist');

const watchlistService = require('../../services/watchlistService');

describe('watchlist Service', () => {
  describe('Add watchlist', () => {
    test('Should return new watchlist', async () => {
      const userid = 'id123';
      const symbol = 'SYMBOL';
      //const spy = jest.spyOn(createWatchlist);

      getWatchlistBySymbolAndUserId.mockReturnValue(null);
      getWatchlistByUserId.mockReturnValue([{ userid, symbol }]);

      const result = await watchlistService.addWatchlist(userid, symbol);

      //expect(spy).toHaveBeenCalled(1);
      expect(result).not.toBeNull();
    });

    // test('Should return new watchlist', async () => {
    //   const userid = 'id123';
    //   const symbol = 'SYMBOL';

    //   getWatchlistBySymbolAndUserId.mockReturnValue(null);
    //   getWatchlistByUserId.mockReturnValue([{ userid, symbol }]);

    //   const result = await watchlistService.addWatchlist(userid, symbol);

    //   expect(result).not.toBeNull();
    // });
  });
});
