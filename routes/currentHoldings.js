const express = require('express');
const router = express.Router();
const pool = require('../database/dbPool');
const axios = require('axios');
const functions = require('../utils/calculateValue');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  console.log(process.env.IEX_API_TOKEN);

  try {
    const currentHoldings = await pool.query(
      'SELECT * FROM currentHoldings WHERE user_id::text = $1',
      [userid]
    );

    if (currentHoldings) {
      const getLatestPrices = currentHoldings.rows.map((item) =>
        axios
          .get(
            `https://sandbox.iexapis.com/stable/stock/${item.symbol}/batch?types=quote&token=${process.env.SANDBOX_IEX_API_TOKEN}`
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
        return functions.createStockModel(item);
      });
    }

    const holdingsValue = functions.calculateHoldingsValue(
      currentHoldings.rows
    );

    res.send({ currentHoldings: currentHoldings.rows, holdingsValue });
  } catch (error) {
    console.log(error);
  }
});

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
