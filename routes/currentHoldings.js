const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const axios = require('axios');
const calculateCurrentHoldingValue = require('../utils/helperFunctions');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    const currentHoldings = await pool.query(
      'SELECT * FROM currentHoldings WHERE user_id::text = $1',
      [userid]
    );
    if (currentHoldings) {
      const getLatestPrices = currentHoldings.rows.map((item) =>
        axios
          .get(
            `https://sandbox.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`
          )
          .then((data) => data.data)
      );

      const latestPrices = await Promise.all(getLatestPrices).then(
        (response) => {
          return response.map((item) => item.quote.latestPrice);
        }
      );

      currentHoldings.rows.map((item, i) =>
        Object.assign(item, { latestPrice: `${latestPrices[i]}` })
      );
    }
    //console.log(currentHoldings.rows);

    res.send(currentHoldings.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

//https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,tsla&types=quote&token=Tpk_46da5c418ebb4881aa02973b23cda9d8
