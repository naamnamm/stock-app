const { updateUserLastActiveAt } = require('../database/dbUser');

module.exports = async (req, res) => {
  const { username } = req.body;

  await updateUserLastActiveAt(null, username);

  res.send({ msg: 'successfully logged out' });
};
