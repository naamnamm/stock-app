const { updateUserLastActiveAt } = require('../../database/dbUser');
const dbUser = require('../../database/dbUser');
jest.mock('../../database/dbUser');

const logoutController = require('../../controllers/logoutController');

const request = { body: { username: 'user123' } };

const response = {
  send: jest.fn(),
};

describe('Log out Controller', () => {
  test('should process logout and send success message', async () => {
    const mockSuccessMessage = { msg: 'successfully logged out' };

    const spy = jest.spyOn(dbUser, 'updateUserLastActiveAt');

    response.send.mockImplementation(() => mockSuccessMessage);

    await logoutController(request, response);

    expect(response.send).toHaveBeenCalledWith(mockSuccessMessage);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Should throw error if user did not successfully logout', async () => {
    updateUserLastActiveAt.mockImplementation(() => {
      throw new Error('something went wrong during');
    });

    expect(logoutController(request, response)).resolves.toThrowError();
  });
});
