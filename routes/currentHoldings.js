const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const axios = require('axios');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  console.log('currentholding:', userid);

  try {
    const currentHoldings = await pool.query(
      'SELECT * FROM currentHoldings WHERE user_id::text = $1',
      [userid]
    );
    if (currentHoldings) {
      const mappedPromises = currentHoldings.rows.map((item) =>
        axios
          .get(
            `https://sandbox.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`
          )
          .then((data) => data.data)
      );

      //console.log(mappedPromises);

      const quoteData = await Promise.all(mappedPromises).then((response) => {
        console.log('response,', response);

        return response.map((item) => item.quote.latestPrice);
      });
      console.log('quoteData', quoteData);
      //map data to get list of symbols > map with axios
      //
    }
    console.log(currentHoldings.rows);
    //console.log(allOrders);
    res.send(currentHoldings.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

//https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,tsla&types=quote&token=Tpk_46da5c418ebb4881aa02973b23cda9d8
