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

      getWatchlistBySymbolAndUserId.mockReturnValue(null);
      getWatchlistByUserId.mockReturnValue([{ userid, symbol }]);

      const result = await watchlistService.addWatchlist(userid, symbol);

      expect(result).not.toBeNull();
    });

    test('Should throw error if userid and symbol match', async () => {
      const userid = 'id123';
      const symbol = 'SYMBOL';

      getWatchlistBySymbolAndUserId.mockReturnValue([{ symbol: 'TSLA' }]);

      try {
        await watchlistService.addWatchlist(userid, symbol);
      } catch (error) {
        expect(error).toEqual(new Error('Symbol already exists in watchlist.'));
      }
    });
  });
});
