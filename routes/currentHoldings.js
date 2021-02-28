const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  console.log('currentholding:', userid);

  try {
    const currentHoldings = await pool.query(
      'SELECT * FROM currentHoldings WHERE user_id::text = $1',
      [userid]
    );
    console.log(currentHoldings);
    //console.log(allOrders);
    res.send(currentHoldings.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
