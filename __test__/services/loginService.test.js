const { getUserByUsername } = require('../../database/dbUser');
jest.mock('../../database/dbUser');

const { UserToken, createToken } = require('../../utils/authToken');
jest.mock('../../utils/authToken');

const bcrypt = require('bcrypt');
jest.mock('bcrypt');

const loginUserService = require('../../services/loginService');

const getMockedLoginUserData = () => {
  return new UserToken('token123', 'id123', 'user123');
};

describe('Login User Service', () => {
  describe('Login User', () => {
    test('Should return user login data', async () => {
      const mockUserLoginData = getMockedLoginUserData();

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

      //why does this not work?
      //const result = await loginUserService.loginUser(username, password);
      //expect(result).toEqual(new Error('username does not match'));

      //Q2 is this correct? this doesn't make sense to me
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

//https://stackoverflow.com/questions/51801027/how-do-i-mock-a-function-that-is-called-inside-the-function-i-am-testing/51801378
//https://jestjs.io/docs/tutorial-async#rejects
