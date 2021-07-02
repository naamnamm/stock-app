const express = require('express');
const router = express.Router();
const pool = require('../database/dbPool');
const fetch = require('node-fetch');
const functions = require('../utils/functions');
const { post } = require('../controllers/transactionsController');

//router.get('/:userid', get);

router.post('/', post);

module.exports = router;

//https://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
//https://www.javatpoint.com/postgresql-upsert

// work with transaction
// https://www.wlaurance.com/2016/09/nodejs-postgresql-transactions-and-query-examples
