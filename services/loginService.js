const {
  getUserByUsername,
  updateUserLastActiveAt,
} = require('../database/dbUser');
const bcrypt = require('bcrypt');
const { UserToken, createToken } = require('../utils/authToken');

const loginUser = async (username, password) => {
  const usernameMatch = await getUserByUsername(username);
  //if user doesn't match test if error is thrown
  //test #1
  if (
    !usernameMatch ||
    !(await bcrypt.compare(password, usernameMatch.password))
  ) {
    const error = new Error('either username or password does not match');
    error.status = 403;
    throw error;
  }
  //otherwise test 2 - if user match, return data
  await updateUserLastActiveAt(new Date(), username);

  const token = createToken(usernameMatch);
  //---------------------------

  //return login data
  return new UserToken(token, usernameMatch.id, usernameMatch.name);
  // return {
  //   token,
  //   id: usernameMatch.id,
  //   name: usernameMatch.name,
  // };
};

module.exports = { loginUser };
