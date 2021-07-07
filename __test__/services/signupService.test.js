const { getUserByUsername } = require('../../database/dbUser');
jest.mock('../../database/dbUser');

const signupUserService = require('../../services/signupService');

describe('User Registration Service', () => {
  describe('Register User', () => {
    test('When username does not match, new user is being created', async () => {
      getUserByUsername.mockReturnValue(null);

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
