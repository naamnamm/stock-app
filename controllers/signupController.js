const signupService = require('../services/signupService');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await signupService.signupUser(username, password);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(error.status).send({ errorMessage: error.message });
  }
};
