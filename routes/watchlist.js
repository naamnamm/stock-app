const express = require('express');
const router = express.Router();
const { post, get, deleteFn } = require('../controllers/watchlistController');

router.post('/', post);

router.get('/:userid', get);

router.delete('/:stockid/:userid', deleteFn);

module.exports = router;
