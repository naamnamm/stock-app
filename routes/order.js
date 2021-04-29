const express = require('express');
const router = express.Router();
const pool = require('../database/dbPool');
const fetch = require('node-fetch');
const functions = require('../utils/calculateValue');
const { get, post } = require('../controllers/orderController');

router.get('/:userid', get);

router.post('/', post);

module.exports = router;

//res.send({ errorMsg: 'Failed to place order, please try again' });
// const existingHolding = await pool.query(
//   'SELECT * FROM currentHoldings WHERE user_id::text = $1 AND symbol = $2',
//   [userid, symbol]
// );

//https://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
//https://www.javatpoint.com/postgresql-upsert

// work with transaction
// https://www.wlaurance.com/2016/09/nodejs-postgresql-transactions-and-query-examples
