const { getUserByUsername, createNewUser } = require('../database/dbUser');
const bcrypt = require('bcrypt');

const signupUser = async (username, password) => {
  const usernameMatch = await getUserByUsername(username);

  // TEST THIS --
  if (usernameMatch) {
    //test if username match > throw error
    const error = new Error('Username already exist');
    // status is 409
    error.status = 409;
    throw error;
  }

  const saltRounds = await bcrypt.genSalt();
  const passHash = await bcrypt.hash(password, saltRounds);

  // test 2 if this function is being called
  const newUser = await createNewUser(username, passHash, null);

  return newUser;
};

module.exports = { signupUser };
