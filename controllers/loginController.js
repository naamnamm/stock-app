const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  getUserByUsername,
  updateUserLastActiveAt,
} = require('../database/dbUser');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usernameMatch = await getUserByUsername(username);

    if (usernameMatch) {
      const passwordMatch = await bcrypt.compare(
        password,
        usernameMatch.password
      );
      if (passwordMatch) {
        await updateUserLastActiveAt(new Date(), username);

        const payload = {
          id: usernameMatch.id,
          name: usernameMatch.name,
        };

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '12hrs',
        });

        res.status(201).send({
          token,
          id: usernameMatch.id,
          name: usernameMatch.name,
        });
      } else {
        res.status(403).send({
          error: { code: 403, message: 'Invalid Password' },
        });
      }
    } else {
      res.status(403).send({
        error: { code: 403, message: 'Invalid Username' },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
