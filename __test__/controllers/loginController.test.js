const { UserToken, createToken } = require('../../utils/authToken');
jest.mock('../../utils/authToken');

const loginService = require('../../services/loginService');
jest.mock('../../services/loginService');

const loginController = require('../../controllers/loginController');

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

const getMockedLoginUser = () => {
  return new UserToken('token123', 'id123', 'user123');
};

const request = { body: { username: 'user123', password: 'pass123' } };
const response = getMockedResponse();

describe('Login User Controller', () => {
  describe('Login User', () => {
    test('loginService should be called once with loginUser obj', async () => {
      loginService.loginUser.mockReturnValue(
        new UserToken('token123', 'id123', 'user123')
      );

      await loginController(request, response);

      const spyLoginService = jest.spyOn(loginService, 'loginUser');

      expect(spyLoginService).toHaveBeenCalledTimes(1);
    });

    test('Reponse should be called with loginUser obj', async () => {
      const loginUser = getMockedLoginUser;

      loginService.loginUser.mockReturnValue(loginUser);

      await loginController(request, response);

      expect(response.send).toHaveBeenCalledWith(loginUser);
    });

    test('Should throw error if username and/or password does not match', async () => {
      loginService.loginUser.mockImplementation(() => {
        throw new Error('username and/or password does not match');
      });

      expect(loginController(request, response)).resolves.toThrowError();
    });
  });
});
