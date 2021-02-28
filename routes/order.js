const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  const { symbol, type, quantity, price, userid } = req.body;

  console.log(symbol);

  try {
    const orderFilled = await pool.query(
      'INSERT INTO orders (symbol, type, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [symbol, type, quantity, price, userid]
    );

    if (orderFilled) {
      await pool.query(
        'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4)',
        [symbol, quantity, price, userid]
      );
    }

    res.send({
      successMsg: `Your ${type}ing order has been filled`,
    });
  } catch (error) {
    res.send({ errorMsg: 'Failed to place order, please try again' });
    console.log(error);
  }
});

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  console.log(userid);

  try {
    const allOrders = await pool.query(
      'SELECT * FROM orders WHERE user_id::text = $1',
      [userid]
    );
    //console.log(allOrders);
    res.send(allOrders.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
