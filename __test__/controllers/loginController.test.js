const { UserToken, createToken } = require('../../utils/authToken');
jest.mock('../../utils/authToken');

const loginController = require('../../controllers/loginController');
const loginService = require('../../services/loginService');

const getMockedResponse = () => {
  const response = {
    statusCode: 200,
    send: jest.fn((obj) => obj),
    status: jest.fn((code) => {
      statusCode = code;
      return response;
    }),
  };

  return response;
};

describe('Login User Controller', () => {
  describe('Login User', () => {
    test('loginService should be called', async () => {
      const request = { body: { username: 'user123', password: 'pass123' } };
      const body = request.body;
      const response = getMockedResponse();

      loginService.loginUser.mockReturnValue(
        new UserToken('token123', 'id123', 'user123')
      );

      await loginController(request, response);

      const spyLoginService = jest.spyOn(loginService, 'loginUser');

      expect(spyLoginService).toHaveBeenCalledTimes(1);
    });

    // test('Should throw error if username does not match', async () => {
    //   const username = 'user123';
    //   const password = 'pass123';

    //   getUserByUsername.mockReturnValue(null);

    //   expect(response.send).toHaveBeenCalledWith(userSession);
    // });

    // test('Should throw error if password does not match', async () => {
    //   const username = 'user123';
    //   const password = 'pass123';

    //   getUserByUsername.mockReturnValue({ id: 'id123', name: username });
    //   bcrypt.compare.mockReturnValue(false);

    //   await expect(async () => {
    //     await loginUserService.loginUser(username, password);
    //   }).rejects.toEqual(new Error('password does not match'));
    // });
  });
});
