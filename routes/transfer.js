const express = require('express');
const router = express.Router();
const { get, post } = require('../controllers/transferController');

router.get('/:userid', get);

router.post('/', post);

module.exports = router;
