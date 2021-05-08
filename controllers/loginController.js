const loginService = require('../services/loginService');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  //test 1 - if the method is called
  // mock the login service - to see if the method si call ataelast one time when passing user an pass
  // if it came back then it's successfull
  try {
    const loginUser = await loginService.loginUser(username, password);
    res.send(loginUser);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({ errorMessage: error.message });
  }
};
