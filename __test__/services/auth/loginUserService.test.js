//test if both user and password matched, it returns user data
const { getUserByUsername } = require('../../../database/dbUser');
const { UserToken, createToken } = require('../../../utils/authToken');
jest.mock('../../../database/dbUser');
jest.mock('../../../utils/authToken');
const loginUserService = require('../../../services/loginService');

// this is the mocked data that return userLoginData
const getMockedLoginUserData = () => {
  return new UserToken('token123', 'id123', 'user123');
};

describe('Login User Service', () => {
  describe('Login User', () => {
    test('Should return user login data', async () => {
      const mockUserLoginData = getMockedLoginUserData();

      const { id, name, token } = mockUserLoginData;

      const username = 'user123';
      const password = 'pass123';

      getUserByUsername.mockReturnValue(id, name);
      createToken.mockReturnValue(token);

      const result = await loginUserService.loginUser(username, password);

      //result = {
      // token: token123,
      // id: id123
      // name: test123
      //}

      expect(result).toEqual(mockUserLoginData);
    });
  });
});
// const sum = require('../../../sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

//test 1 if error is thrown when username or password doesn't match
