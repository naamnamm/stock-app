const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/dbPool');
const { getUserByUsername, createNewUser } = require('../database/dbUser');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = [];

    const userMatch = await getUserByUsername(username);

    if (userMatch) {
      errors.push({ message: 'Username already exist!' });
    }

    if (errors.length > 0) {
      return res.status(401).send(errors);
    } else {
      const saltRounds = await bcrypt.genSalt();
      const passHash = await bcrypt.hash(password, saltRounds);

      await createNewUser(username, passHash, null);

      res
        .status(201)
        .send({ success: { code: 201, message: 'successfully signed up' } });
    }
  } catch (error) {
    console.log(error);
  }
};
