const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;
  //console.log(userid);

  const transferHistory = await pool.query(
    'SELECT * FROM cash_transfer WHERE user_id::text = $1',
    [userid]
  );

  if (transferHistory) {
    res.send(JSON.stringify(transferHistory.rows));
  }
});

router.post('/', async (req, res) => {
  const { amount, user, type } = req.body;

  try {
    // first insert transaction into cash_transfer
    const transfer = await pool.query(
      'INSERT INTO cash_transfer (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
      [type, amount, user.id]
    );

    //then insert transaction into cash_balance
    const updateCashBalance = await pool.query(
      'INSERT INTO cash_balance (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
      [type, amount, user.id]
    );

    const transferHistory = await pool.query(
      'SELECT * FROM cash_transfer WHERE user_id = $1',
      [user.id]
    );

    res.send({ msg: 'success', transaction: transferHistory.rows });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
