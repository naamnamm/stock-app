const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

const authToken = require('../../utils/authToken');

describe('Create Auth Token', () => {
  // test('Should return token', async () => {
  //   const usernameMatch = { id: 'id123', name: 'name123' };
  //   mockedToken = 'token123';
  //   const sign = jest.spyOn(jwt, 'sign');
  //   sign.mockImplementation(() => mockedToken);
  //   const result = await authToken.createToken(usernameMatch);
  //   expect(result).toEqual('token123');
  // });
});

describe('verify Token', () => {
  const getMockedResponse = () => {
    const response = {
      statusCode: 401,
      sendStatus: jest.fn((code) => {
        statusCode = code;
        return response;
      }),
      // status: 403,
      // send: jest.fn((code) => {
      //   status = code;
      //   return response;
      // }),
      code: 403,
      send: jest.fn((obj) => obj),
      status: jest.fn((status) => {
        code = status;
        return response;
      }),
    };
    return response;
  };

  const res = getMockedResponse();

  describe('verify token unsuccessfully', () => {
    test('response should send error message', async () => {
      const req = {
        headers: { authorization: 'Bearer Token123' },
        user: 'user123',
      };
      const next = jest.fn();

      const verify = jest.spyOn(jwt, 'verify');
      verify.mockImplementation(() => new Error());

      const mockSendObject = { message: 'Invalid or expired token' };

      await authToken.verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith(mockSendObject);
      expect(res.status).toEqual(403);
    });
  });
});

// test('response should send status 401', async () => {
//   const req = {
//     headers: { authorization: null },
//     user: 'user123',
//   };
//   const next = jest.fn();
//   authToken.verifyToken(req, res, next);
//   expect(res.sendStatus).toHaveBeenCalledWith(401);
// });
//describe('verify token successfully', () => {
// test('verify and next should be called', async () => {
//   const req = {
//     headers: { authorization: 'Bearer Token123' },
//     user: 'user123',
//   };
//   const next = jest.fn();
//   const verify = jest.spyOn(jwt, 'verify');
//   verify.mockImplementation(() => next());
//   await authToken.verifyToken(req, res, next);
//   expect(verify).toHaveBeenCalled();
//   expect(next).toHaveBeenCalled();
// });
//});
