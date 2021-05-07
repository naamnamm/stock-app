const sum = require('../../../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

//test 1 if error is thrown when username or password doesn't match

//test 2 if both user and password matched, it returns user data

test('Should return user session', async () => {
  const username = 'test123';
  const password = 'pass123';
  const result = await loginUserService.loginUser(username, password);

  expect(result).toEqual(userData);
});
