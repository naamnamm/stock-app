const jwt = require('jsonwebtoken');

// const userToken = (token, userId, userName) => {
//   (this.token = token), (this.id = userId), (this.name = userName);
// };
class UserToken {
  constructor(token, userId, userName) {
    (this.token = token), (this.id = userId), (this.name = userName);
  }
}

const createToken = (usernameMatch) => {
  const { id, name } = usernameMatch;

  console.log('usernameMatch :>> ', usernameMatch);

  const payload = {
    id,
    name,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12hrs',
  });

  console.log('token :>> ', token);

  return token;
};

const verifyToken = (req, res, next) => {
  console.log('req :>> ', req);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  console.log('token :>> ', token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ message: 'Invalid or expired token' });
    req.user = user;
    console.log('req :>> ', req);
    next();
  });
};

module.exports = { createToken, verifyToken, UserToken };
