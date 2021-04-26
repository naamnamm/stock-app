const express = require('express');
const router = express.Router();
const pool = require('../database/dbPool');
const functions = require('../utils/calculateValue');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  const cashBalance = await pool.query(
    'SELECT amount FROM cash_balance WHERE user_id::text = $1',
    [userid]
  );

  const cashAvailableToTrade = functions.calculateCashAvailable(cashBalance);

  if (cashAvailableToTrade) {
    res.send({ cashAvailableToTrade });
  }
});

module.exports = router;
