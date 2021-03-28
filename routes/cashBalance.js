const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const functions = require('../utils/calculateValue');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;
  console.log(userid);

  const cashBalance = await pool.query(
    'SELECT amount FROM cash_balance WHERE user_id::text = $1',
    [userid]
  );

  console.log(cashBalance);

  const cashAvailableToTrade = functions.calculateCashAvailable(cashBalance);

  console.log(cashAvailableToTrade);
  if (cashAvailableToTrade) {
    res.send({cashAvailableToTrade});
  }
});

module.exports = router;
