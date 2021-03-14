const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const axios = require('axios');
const functions = require('../utils/calculateValue');

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

      currentHoldings.rows.map((item, i) => {
        Object.assign(item, { latestPrice: `${latestPrices[i]}` });
        //Object.assign(item, { latestPrice: 10 });

        return functions.createStockModel(item);
      });

      console.log(currentHoldings.rows);
    }

    res.send(currentHoldings.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

//https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,tsla&types=quote&token=Tpk_46da5c418ebb4881aa02973b23cda9d8

// const days = await functions.getDays(currentHoldings.rows[0].created_at);

//     if (days) {
//       const response = await axios.get(
//         `https://sandbox.iexapis.com/stable/stock/TSLA/chart/${days}d?token=Tsk_66820f5895ad4695ba96beee7925717b`
//       );

//       const mappedValue = response.data.map((item) => item.close * 10);
//       const mappedDate = response.data.map((item) => item.date);
//       console.log(mappedValue, mappedDate);
//     }
