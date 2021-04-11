const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const formatChart = require('../utils/chart');

router.get('/search/:selectedStock', async (req, res) => {
  const { selectedStock } = req.params;

  const fetchQuote = await fetch(
    `https://sandbox.iexapis.com/stable/stock/${selectedStock}/batch?types=quote,chart&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`
  );
  const fetchCompany = await fetch(
    `https://cloud.iexapis.com/stable/stock/${selectedStock}/company?token=pk_cd4a2d89dfbe4945828c42cdaadbed9c`
  );
  const companyData = await fetchCompany.json();

  const quoteData = await fetchQuote.json();

  const chartData = formatChart(quoteData);

  res.send({ quoteData, chartData, companyData });
});

module.exports = router;
