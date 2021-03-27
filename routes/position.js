const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/:userid/:selectedStock', async (req, res) => {
  const { userid, selectedStock } = req.params;

  try {
    const currentHoldings = await pool.query(
      'SELECT * FROM currentHoldings WHERE user_id::text = $1',
      [userid]
    );

    const position = currentHoldings.rows.find(
      (stock) => stock.symbol === selectedStock
    );

    console.log('position', position);
    if (position) {
      res.send(position.quantity);
    } else {
      res.send({ msg: 'no current position' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
