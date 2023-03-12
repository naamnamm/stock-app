const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const formatChart = require('../utils/chart');
const { stockList } = require('../utils/symbols');

router.get('/search/:stockId', async (req, res) => {
  const { stockId } = req.params;

  const fetchHistoricalPrice = await fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${stockId}?apikey=${process.env.apikey}`
  );
  const historicalPriceData = await fetchHistoricalPrice.json();
  const chartData = formatChart(historicalPriceData);

  const fetchCompanyProfile = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${stockId}?apikey=${process.env.apikey}`
  );
  const companyData = await fetchCompanyProfile.json();

  res.send({ chartData, companyData });
});

router.get('/stocksList', async (req, res) => {
  res.send({ stockList });
});

module.exports = router;
