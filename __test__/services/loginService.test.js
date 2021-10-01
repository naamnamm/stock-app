const { getUserByUsername } = require('../../database/dbUser');
jest.mock('../../database/dbUser');

const { UserToken, createToken } = require('../../utils/authToken');
jest.mock('../../utils/authToken');

const bcrypt = require('bcrypt');
jest.mock('bcrypt');

const loginUserService = require('../../services/loginService');

describe('Login User Service', () => {
  describe('Login User', () => {
    test('Should return user login data', async () => {
      const mockUserLoginData = new UserToken('token123', 'id123', 'user123');

      const username = 'user123';
      const password = 'pass123';

      getUserByUsername.mockReturnValue({ id: 'id123', name: username });
      bcrypt.compare.mockReturnValue(true);
      createToken.mockReturnValue('token123');

      const result = await loginUserService.loginUser(username, password);

      expect(result.id).toEqual(mockUserLoginData.id);
      expect(result.name).toEqual(mockUserLoginData.name);
      expect(result.token).toEqual(mockUserLoginData.token);
    });

    test('Should throw error if username does not match', async () => {
      const username = 'user123';
      const password = 'pass123';

      getUserByUsername.mockReturnValue(null);

      await expect(async () => {
        await loginUserService.loginUser(username, password);
      }).rejects.toEqual(new Error('username does not match'));
    });

    test('Should throw error if password does not match', async () => {
      const username = 'user123';
      const password = 'pass123';

      getUserByUsername.mockReturnValue({ id: 'id123', name: username });
      bcrypt.compare.mockReturnValue(false);

      await expect(async () => {
        await loginUserService.loginUser(username, password);
      }).rejects.toEqual(new Error('password does not match'));
    });
  });
});
