const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

module.exports = authToken;
