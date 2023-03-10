const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const formatChart = require('../utils/chart');
const { stockList } = require('../utils/symbols');

router.get('/search/:stockId', async (req, res) => {
  const { stockId } = req.params;

  const fetchQuote = await fetch(
    //`https://sandbox.iexapis.com/stable/stock/${stockId}/batch?types=quote,chart&token=${process.env.SANDBOX_IEX_API_TOKEN}`
    `https://cloud.iexapis.com/stable/stock/${stockId}/batch?types=quote,chart&token=${process.env.IEX_API_TOKEN}`
  );
  const fetchCompany = await fetch(
    //`https://sandbox.iexapis.com/stable/stock/${stockId}/company?token=${process.env.SANDBOX_IEX_API_TOKEN}`
    `https://cloud.iexapis.com/stable/stock/${stockId}/company?token=${process.env.IEX_API_TOKEN}`
  );
  const companyData = await fetchCompany.json();

  const quoteData = await fetchQuote.json();

  const chartData = formatChart(quoteData);

  res.send({ quoteData, chartData, companyData });
});

router.get('/stocksList', async (req, res) => {
  res.send({ stockList });
});

module.exports = router;
