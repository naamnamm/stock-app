const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/:userid', async (req, res) => {
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

router.post('/', async (req, res) => {
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

module.exports = router;
