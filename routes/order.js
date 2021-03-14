const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  const { symbol, type, quantity, price, userid } = req.body;

  console.log(type);

  try {
    //get total cash balance from cash balance table
    const cashAvailable = await pool.query(
      'INSERT INTO orders (symbol, type, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [symbol, type, quantity, price, userid]
    );
    //if (quantity * price) > cash available {
    // res.send({errorMsg: 'cash balance not enough please add more cash to your account'})
    //} else {
    // (orderfilled)
    //}
    //

    const orderFilled = await pool.query(
      'INSERT INTO orders (symbol, type, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [symbol, type, quantity, price, userid]
    );

    if (orderFilled) {
      await pool.query(
        'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET quantity = currentHoldings.quantity + EXCLUDED.quantity, purchaseprice = (currentHoldings.purchaseprice + EXCLUDED.purchaseprice)/(currentHoldings.quantity + EXCLUDED.quantity) RETURNING *',
        [symbol, quantity, price, userid]
      );

      // await pool.query(
      //   'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4)',
      //   [symbol, quantity, price, userid]
      // );
      // await pool.query(
      //   'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4)',
      //   [symbol, quantity, price, userid]
      // );
    }

    res.send({
      successMsg: `Your ${type}ing order has been filled`,
    });
  } catch (error) {
    console.log(error);
    // console.log(symbol, type, quantity, price, userid);
    // const updateHolding = await pool.query(
    //   'INSERT INTO currentHoldings SET quantity = quantity + $1, purchaseprice = (purchaseprice + $2)/quantity WHERE user_id::text = $3 AND symbol = $4',
    //   [quantity, price, userid, symbol]
    // );
    // console.log(updateHolding.rows);
    // res.send(updateHolding.rows);
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

//res.send({ errorMsg: 'Failed to place order, please try again' });
// const existingHolding = await pool.query(
//   'SELECT * FROM currentHoldings WHERE user_id::text = $1 AND symbol = $2',
//   [userid, symbol]
// );

//https://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
//https://www.javatpoint.com/postgresql-upsert

// work with transaction
// https://www.wlaurance.com/2016/09/nodejs-postgresql-transactions-and-query-examples
