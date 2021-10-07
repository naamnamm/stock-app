const { getUserByUsername, createNewUser } = require('../database/dbUser');
const bcrypt = require('bcrypt');

const signupUser = async (username, password) => {
  const usernameMatch = await getUserByUsername(username);

  if (usernameMatch) {
    const error = new Error('Username already exist');
    error.status = 409;
    throw error;
  }

  const saltRounds = await bcrypt.genSalt();
  const passHash = await bcrypt.hash(password, saltRounds);

  const newUser = await createNewUser(username, passHash, null);

  return newUser;
};

module.exports = { signupUser };
