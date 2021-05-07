const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authToken');
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
const logoutController = require('../controllers/logoutController');

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/verify-token', verifyToken, (req, res) => {
  try {
    const data = Object.assign(req.user, { isVerified: true });
    res.json(data);
  } catch (error) {
    res.status(403).send('Invalid or Expired token');
  }
});

module.exports = router;
