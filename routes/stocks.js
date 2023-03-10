const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const formatChart = require('../utils/chart');
const { stockList } = require('../utils/symbols');

router.get('/search/:stockId', async (req, res) => {
  const { stockId } = req.params;

  //need to get historical quote data
  const fetchHistoricalPrice = await fetch(
    //`https://sandbox.iexapis.com/stable/stock/${stockId}/batch?types=quote,chart&token=${process.env.SANDBOX_IEX_API_TOKEN}`
    //`https://cloud.iexapis.com/stable/stock/${stockId}/batch?types=quote,chart&token=${process.env.IEX_API_TOKEN}`
    //`https://cloud.iexapis.com/stable/stock/${stockId}/batch?types=quote,chart&token=${process.env.IEX_API_TOKEN}`
    `https://financialmodelingprep.com/api/v3/historical-price-full/${stockId}?apikey=${process.env.apikey}`
  );
  const historicalPriceData = await fetchHistoricalPrice.json();
  const chartData = formatChart(historicalPriceData);

  //done
  const fetchCompanyProfile = await fetch(
    //`https://sandbox.iexapis.com/stable/stock/${stockId}/company?token=${process.env.SANDBOX_IEX_API_TOKEN}`
    //`https://cloud.iexapis.com/stable/stock/${stockId}/company?token=${process.env.IEX_API_TOKEN}`
    `https://financialmodelingprep.com/api/v3/profile/${stockId}?apikey=${process.env.apikey}`
  );
  const companyData = await fetchCompanyProfile.json();

  res.send({ chartData, companyData });
  //res.send({ quoteData, chartData, companyData });
});

router.get('/stocksList', async (req, res) => {
  res.send({ stockList });
});

module.exports = router;
