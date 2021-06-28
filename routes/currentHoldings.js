const express = require('express');
const router = express.Router();

const {
  getCurrentHoldings,
  getCurrentHoldingByStockSymbol,
} = require('../controllers/currentHoldingController');

// this is from Dashboard.js
router.get('/:userid', getCurrentHoldings);

// this is from Transaction.js
router.get('/:userid/:selectedStock', getCurrentHoldingByStockSymbol);

module.exports = router;
