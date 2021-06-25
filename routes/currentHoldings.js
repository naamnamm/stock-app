const express = require('express');
const router = express.Router();

const {
  get,
  getBySelectedStock,
} = require('../controllers/currentHoldingController');

// this is from Dashboard.js
router.get('/:userid', get);

// this is from Transaction.js
router.get('/:userid/:selectedStock', getBySelectedStock);

module.exports = router;
