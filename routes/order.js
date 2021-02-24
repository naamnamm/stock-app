// const express = require('express');
// const router = express.Router();
// // const pool = require('../database/db');
// const fetch = require('node-fetch');

// router.post('/order', async (req, res) => {
//   const { amount, price, userid, symbol, type } = req.body;
//   await pool.query(
//     'INSERT INTO orders (symbol, amount) VALUES ($1, $2)',
//     [symbol, userid]
//   );

//   const fetchQuote = await fetch(
//     `https://sandbox.iexapis.com/stable/stock/${selectedStock}/batch?types=quote,chart&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`
//   );
//   const quoteData = await fetchQuote.json();

//   const chartData = formatChart(quoteData);

//   res.send({ quoteData, chartData });
// });

// module.exports = router;
