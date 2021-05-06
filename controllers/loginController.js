const loginService = require('../services/loginService');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const loginUser = await loginService.loginUser(username, password);
    res.send(loginUser);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({ errorMessage: error.message });
  }
};
