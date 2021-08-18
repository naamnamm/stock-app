jest.mock('../../database/dbUser');

const signupService = require('../../services/signupService');
jest.mock('../../services/signupService');

const signupController = require('../../controllers/signupController');

const request = { body: { username: 'user123', password: 'pass123' } };

const response = {
  send: jest.fn(),
  statusCode: 201,
  status: jest.fn((code) => {
    statusCode = code;
    return response;
  }),
};

describe('signup Controller', () => {
  test('should sign user up send back user info', async () => {
    const newUser = { username: 'user123' };

    signupService.signupUser.mockReturnValue(newUser);

    response.send.mockImplementation(() => newUser);

    await signupController(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.send).toHaveBeenCalledWith(newUser);
  });

  test('Should throw error if user did not successfully logout', async () => {
    signupService.signupUser.mockImplementation(() => {
      throw new Error('something went wrong during');
    });

    try {
      await signupController(request, response);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
