const { getUserByUsername, createNewUser } = require('../../database/dbUser');
jest.mock('../../database/dbUser');

const bcrypt = require('bcrypt');
jest.mock('bcrypt');

const signupUserService = require('../../services/signupService');

describe('User Registration Service', () => {
  describe('Register User', () => {
    test('Should return new user', async () => {
      const mockNewUser = { id: 'id123', name: 'user123' };

      getUserByUsername.mockReturnValue(null);
      // do we need to get mock return value for bcrypt?
      // bcrypt.genSalt.mockReturnValue(10);
      // bcrypt.hash.mockReturnValue('hash123');

      const newUser = { id: 'id123', name: 'user123' };
      createNewUser.mockReturnValue(newUser);

      const username = 'user123';
      const password = 'pass123';
      const result = await signupUserService.signupUser(username, password);

      expect(result.id).toEqual(mockNewUser.id);
      expect(result.name).toEqual(mockNewUser.name);
    });

    // test('Should throw error if username match', async () => {
    //   const username = 'user123';
    //   const password = 'pass123';

    //   getUserByUsername.mockReturnValue(null);

    //   await expect(async () => {
    //     await loginUserService.loginUser(username, password);
    //   }).rejects.toEqual(new Error('username does not match'));
    // });
  });
});
