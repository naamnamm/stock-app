const express = require('express');
const router = express.Router();
const { post } = require('../controllers/transactionsController');

router.post('/', post);

module.exports = router;
