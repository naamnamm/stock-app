const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const formatChart = require('../utils/chart');

router.get('/search/:stockId', async (req, res) => {
  const { stockId } = req.params;

  const fetchQuote = await fetch(
    `https://sandbox.iexapis.com/stable/stock/${stockId}/batch?types=quote,chart&token=${process.env.SANDBOX_IEX_API_TOKEN}`
  );
  const fetchCompany = await fetch(
    `https://cloud.iexapis.com/stable/stock/${stockId}/company?token=${process.env.IEX_API_TOKEN}`
  );
  const companyData = await fetchCompany.json();

  const quoteData = await fetchQuote.json();

  const chartData = formatChart(quoteData);

  res.send({ quoteData, chartData, companyData });
});

// router.get('/search/stock/:selectedStock', async (req, res) => {
//   const { selectedStock } = req.params;

//   const fetchQuote = await fetch(
//     `https://sandbox.iexapis.com/stable/stock/${selectedStock}/batch?types=quote,chart&token=${process.env.SANDBOX_IEX_API_TOKEN}`
//   );
//   const fetchCompany = await fetch(
//     `https://cloud.iexapis.com/stable/stock/${selectedStock}/company?token=${process.env.IEX_API_TOKEN}`
//   );
//   const companyData = await fetchCompany.json();

//   const quoteData = await fetchQuote.json();

//   const chartData = formatChart(quoteData);

//   res.send({ quoteData, chartData, companyData });
// });

module.exports = router;
