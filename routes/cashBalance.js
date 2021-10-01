const express = require('express');
const router = express.Router();
const { getCashBalanceByUserId } = require('../database/dbCashBalance');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  const cashBalance = await getCashBalanceByUserId(userid);

  res.send(cashBalance);
});

module.exports = router;
