const {
  getUserByUsername,
  updateUserLastActiveAt,
} = require('../database/dbUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (username, password) => {
  const usernameMatch = await getUserByUsername(username);

  if (
    !usernameMatch ||
    !(await bcrypt.compare(password, usernameMatch.password))
  ) {
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
