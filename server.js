require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const stockData = require('./mockAPI/stockData');
const companyData = require('./mockAPI/company');
const quoteData = require('./mockAPI/quote');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./database/db');
const authToken = require('./utils/authToken');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/stocks/search/:searchInput', async (req, res) => {
  console.log(req.params.searchInput);
  const search = req.params.searchInput.substring(1);
  console.log('search =' + search);

  const fetchData = await fetch(
    'https://api.iextrading.com/1.0/ref-data/symbols'
  );
  const data = await fetchData.json();
  console.log('data =' + data);

  res.json('yes');
});

app.get('/stock/data', async (req, res) => {
  if (stockData) {
    res.send(stockData);
  }
});

app.get('/stock/company', async (req, res) => {
  if (companyData) {
    res.send(companyData);
  }
});

app.get('/stock/quote', async (req, res) => {
  if (quoteData) {
    res.send(quoteData);
  }
});

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

app.post('/watchlist', async (req, res) => {
  const { symbol, userid } = req.body;
  console.log(userid);
  const error = [];

  const useridAndSymbolMatch = await pool.query(
    'SELECT * FROM watchlists WHERE symbol = $1 AND user_id::text = $2',
    [symbol, userid]
  );

  if (useridAndSymbolMatch.rows.length > 0) {
    error.push({ message: 'Symbol alreay exists in watchlist.' });
  }

  if (error.length > 0) {
    return res.status(401).send(error);
  } else {
    await pool.query(
      'INSERT INTO watchlists (symbol, user_id) VALUES ($1, $2)',
      [symbol, userid]
    );
    const watchlists = await pool.query(
      'SELECT * FROM watchlists WHERE user_id::text = $1',
      [userid]
    );
    //console.log(watchlists);
    res.send(JSON.stringify(watchlists.rows));
  }
});

app.get('/watchlist/:userid', async (req, res) => {
  const userid = req.params.userid.slice(1);

  //console.log('userid' + userid);

  const watchlist = await pool.query(
    'SELECT * FROM watchlists WHERE user_id::text = $1',
    [userid]
  );
  console.log(`watchlsit = ${watchlist.rows}`);
  console.log(watchlist.rows);

  if (watchlist) {
    res.send(JSON.stringify(watchlist.rows));
  }
});

app.delete('/watchlist/delete/:stockid/:userid', async (req, res) => {
  //console.log(req.params.userid);
  console.log(req.params.stockid);
  console.log(req.params.userid);

  //const userid = req.params.userid.slice(1);
  const stockid = req.params.stockid.slice(1);
  const userid = req.params.userid.slice(1);
  //console.log('userid' + userid);
  console.log(req.user);

  const deleteItem = await pool.query(
    'DELETE FROM watchlists WHERE id::text = $1 AND user_id::text = $2 RETURNING *',
    [stockid, userid]
  );

  const updatedWatchlist = await pool.query(
    'SELECT * FROM watchlists WHERE user_id::text = $1',
    [userid]
  );

  // );
  // console.log(`watchlsit = ${watchlist.rows}`);
  // console.log(watchlist.rows);

  // if (watchlist) {
  //   res.send(JSON.stringify(watchlist.rows));
  // }
  res.send({ updatedWatchlist: updatedWatchlist.rows });
});

app.get('/verify-token', authToken, (req, res) => {
  try {
    const data = Object.assign(req.user, { isVerified: true });
    res.json(data);
  } catch (error) {
    res.status(403).send('Invalid or Expired token');
  }
});

app.get('/transfer/:userid', async (req, res) => {
  const userid = req.params.userid.slice(1);
  //console.log(userid);

  const transferHistory = await pool.query(
    'SELECT * FROM cash_transfer WHERE user_id::text = $1',
    [userid]
  );

  if (transferHistory) {
    res.send(JSON.stringify(transferHistory.rows));
  }
});

app.post('/transfer', async (req, res) => {
  const { amount, user, type } = req.body;
  console.log(amount, user, type);

  try {
    const transfer = await pool.query(
      'INSERT INTO cash_transfer (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
      [type, amount, user.id]
    );

    const transferHistory = await pool.query(
      'SELECT * FROM cash_transfer WHERE user_id = $1',
      [user.id]
    );

    console.log('transfer', transfer.rows[0]);
    res.send({ msg: 'success', transaction: transferHistory.rows });
  } catch (error) {
    console.log(error);
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));
