const express = require('express');
const router = express.Router();

const {
  get,
  getBySelectedStock,
} = require('../controllers/currentHoldingController');

router.get('/:userid', get);

router.get('/:userid/:selectedStock', getBySelectedStock);

module.exports = router;
