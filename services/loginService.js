const { getUserByUsername } = require('../database/dbUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (username, password) => {
  const usernameMatch = await getUserByUsername(username);

  const passwordMatch = await bcrypt.compare(password, usernameMatch.password);

  console.log(usernameMatch && passwordMatch);

  if (!usernameMatch || !passwordMatch) {
    const error = new Error('either username or password does not match');
    error.status = 403;
    throw error;
  }

  await updateUserLastActiveAt(new Date(), username);

  const payload = {
    id: usernameMatch.id,
    name: usernameMatch.name,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12hrs',
  });

  return {
    token,
    id: usernameMatch.id,
    name: usernameMatch.name,
  };
};

module.exports = { loginUser };
