const signupService = require('../../services/signupService');
jest.mock('../../services/signupService');

const signupController = require('../../controllers/signupController');

const request = { body: { username: 'user123', password: 'pass123' } };

const response = {
  send: jest.fn(),
  statusCode: 201,
  // this doesn't work'
  //status: jest.fn(),

  //don't understand why this works
  status: jest.fn((code) => {
    console.log('code :>> ', code);
    statusCode = code;
    console.log('statusCode :>> ', statusCode);
    console.log('response :>> ', response);
    return response;
    // how does this property has access to response object?
  }),
};

describe('signup Controller', () => {
  test('should sign user up send back user info', async () => {
    //const {username, password} = request.body

    const newUser = { username: 'user123' };

    signupService.signupUser.mockReturnValue(newUser);

    //response.status.mockImplementation(() => 201);
    response.send.mockImplementation(() => newUser);

    await signupController(request, response);

    //expect res.status to send 200
    expect(response.status).toHaveBeenCalledWith(201);

    //expect res to send new user info
    expect(response.send).toHaveBeenCalledWith(newUser);
  });

  // test('Should throw error if user did not successfully logout', async () => {
  //   updateUserLastActiveAt.mockImplementation(() => {
  //     throw new Error('something went wrong during');
  //   });

  //   expect(logoutController(request, response)).resolves.toThrowError();
  // });
});
