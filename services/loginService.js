const {
  getUserByUsername,
  updateUserLastActiveAt,
} = require('../database/dbUser');
const bcrypt = require('bcrypt');
const { UserToken, createToken } = require('../utils/authToken');

const loginUser = async (username, password) => {
  const usernameMatch = await getUserByUsername(username);

  console.log(usernameMatch);
  console.log(!usernameMatch);

  //if user doesn't match test if error is thrown
  //test #1
  if (!usernameMatch) {
    const error = new Error('username does not match');
    error.status = 403;
    throw error;
  }

  if (!(await bcrypt.compare(password, usernameMatch.password))) {
    const error = new Error('password does not match');
    error.status = 403;
    throw error;
  }

  await updateUserLastActiveAt(new Date(), username);

  const token = createToken(usernameMatch);

  console.log(token);

  //console.log(token, usernameMatch.id, usernameMatch.name);

  return new UserToken(token, usernameMatch.id, usernameMatch.name);
};

module.exports = { loginUser };
