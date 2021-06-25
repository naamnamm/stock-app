const express = require('express');
const router = express.Router();
const pool = require('../database/dbPool');
const functions = require('../utils/functions');
const { getCashBalanceByUserId } = require('../database/dbCashBalance');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  const cashBalance = await getCashBalanceByUserId(userid);

  console.log('cash bal', cashBalance);
  res.send(cashBalance);

  // const cashAvailableToTrade = functions.calculateCashAvailable(cashBalance);

  // if (cashAvailableToTrade) {
  //   res.send({ cashAvailableToTrade });
  // }
});

module.exports = router;
