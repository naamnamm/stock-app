const express = require('express');
const router = express.Router();
// const pool = require('../database/db');
const fetch = require('node-fetch');
const formatChart = require('../utils/chart');

router.get('/search/:selectedStock', async (req, res) => {
  //console.log(req.params.selectedStock);
  //const selectedStock = req.params.selectedStock.substring(1);
  //console.log('search =' + search);
  const { selectedStock } = req.params;

  const fetchQuote = await fetch(
    `https://sandbox.iexapis.com/stable/stock/${selectedStock}/batch?types=quote,chart&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`
  );
  const fetchCompany = await fetch(
    `https://cloud.iexapis.com/stable/stock/${selectedStock}/company?token=pk_cd4a2d89dfbe4945828c42cdaadbed9c`
  );
  const companyData = await fetchCompany.json();
  console.log(companyData);

  const quoteData = await fetchQuote.json();

  const chartData = formatChart(quoteData);

  res.send({ quoteData, chartData, companyData });
});

module.exports = router;

// const stockData = require('../mockAPI/stockData');
// const companyData = require('../mockAPI/company');
// const quoteData = require('../mockAPI/quote');
// router.get('/search/:searchInput', async (req, res) => {
//   console.log(req.params.searchInput);
//   const search = req.params.searchInput.substring(1);
//   console.log('search =' + search);

//   const fetchData = await fetch(
//     'https://api.iextrading.com/1.0/ref-data/symbols'
//   );
//   const data = await fetchData.json();
//   console.log('data =' + data);

//   res.json('yes');
// });

// router.get('/data', async (req, res) => {
//   if (stockData) {
//     res.send(stockData);
//   }
// });

// router.get('/company', async (req, res) => {
//   if (companyData) {
//     res.send(companyData);
//   }
// });

// router.get('/quote', async (req, res) => {
//   if (quoteData) {
//     res.send(quoteData);
//   }
// });
