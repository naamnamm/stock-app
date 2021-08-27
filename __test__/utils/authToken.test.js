const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

const {
  UserToken,
  createToken,
  verifyToken,
} = require('../../utils/authToken');
const authToken = require('../../utils/authToken');
jest.mock('../../utils/authToken');

//issue with testing
describe('Create Auth Token', () => {
  test('Should return token', async () => {
    const usernameMatch = { id: 'id123', name: 'name123' };
    mockedToken = 'token123';

    const sign = jest.spyOn(jwt, 'sign');

    sign.mockImplementation(() => () => mockedToken);

    const result = authToken.createToken(usernameMatch);

    expect(result).toEqual('token123');
  });
});

describe('verify Token', () => {
  const getMockedResponse = () => {
    const response = {
      statusCode: 401,
      sendStatus: jest.fn((code) => {
        statusCode = code;
        return response;
      }),
      status: 403,
      send: jest.fn((code) => {
        status = code;
        return response;
      }),
    };
    return response;
  };

  const res = getMockedResponse();

  describe('verify token successfully', () => {
    test('next should be called', async () => {
      const req = {
        headers: { authorization: 'Bearer Token123' },
        user: 'user123',
      };
      const next = jest.fn();

      authToken.verifyToken(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('verify token unsuccessfully', () => {
    test('error should be thrown, send status 401', async () => {
      const req = {
        headers: { authorization: null },
        user: 'user123',
      };
      const next = jest.fn();

      authToken.verifyToken(req, res, next);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    // test('error should be thrown, send status 403', async () => {
    //   const req = {
    //     headers: { authorization: 'Bearer Token123' },
    //     user: 'user123',
    //   };
    //   const res = getMockedResponse();
    //   const next = jest.fn();

    //   try {
    //     authToken.verifyToken(req, res, next);
    //   } catch (error) {
    //     // expect next to be called
    //     expect(next).toHaveBeenCalled();
    //   }
  });
});
