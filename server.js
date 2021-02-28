require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./database/db');
const authToken = require('./utils/authToken');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api/transfer', require('./routes/transfer'));
app.use('/api/watchlist', require('./routes/watchlist'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/currentHoldings', require('./routes/currentHoldings'));

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = [];

    const userMatch = await pool.query('SELECT * FROM users WHERE name = $1', [
      username,
    ]);
    if (userMatch.rows.length > 0) {
      errors.push({ message: 'Username already exist!' });
    }

    // if (password.length < 6) {
    //   errors.push({ message: 'Password must be at least 6 characters' });
    // }

    if (errors.length > 0) {
      return res.status(401).send(errors);
    } else {
      const saltRounds = await bcrypt.genSalt();
      const passHash = await bcrypt.hash(password, saltRounds);
      const newUser = await pool.query(
        'INSERT INTO users (name, password, last_active_at) VALUES ($1, $2, $3) RETURNING *',
        [username, passHash, null]
      );

      res
        .status(201)
        .send({ success: { code: 201, message: 'successfully signed up' } });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const usernameMatch = await pool.query(
      'SELECT * FROM users WHERE name = $1',
      [username]
    );

    if (usernameMatch) {
      const passwordMatch = await bcrypt.compare(
        password,
        usernameMatch.rows[0].password
      );
      if (passwordMatch) {
        await pool.query(
          'UPDATE users SET last_active_at = $1 WHERE name = $2',
          [new Date(), username],
          (err, res) => {
            console.log(err, res);
          }
        );

        const payload = {
          id: usernameMatch.rows[0].id,
          name: usernameMatch.rows[0].name,
        };

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '12h',
        });

        res.status(201).send({
          token,
          id: usernameMatch.rows[0].id,
          name: usernameMatch.rows[0].name,
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
});

app.post('/logout', async (req, res) => {
  const { username } = req.body;

  const logoutUser = await pool.query(
    'UPDATE users SET last_active_at = $1 WHERE name = $2',
    [null, username]
  );

  res.send({ msg: 'successfully logged out' });
});

app.get('/verify-token', authToken, (req, res) => {
  try {
    const data = Object.assign(req.user, { isVerified: true });
    res.json(data);
  } catch (error) {
    res.status(403).send('Invalid or Expired token');
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));
