const { updateUserLastActiveAt } = require('../database/dbUser');

module.exports = async (req, res) => {
  const { username } = req.body;

  try {
    await updateUserLastActiveAt(null, username);
    res.send({ msg: 'successfully logged out' });
  } catch (error) {
    throw new Error('something went wrong during logout');
  }
};
