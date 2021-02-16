const express = require('express');
const router = express.Router();
// const pool = require('../database/db');
const fetch = require('node-fetch');
const stockData = require('../mockAPI/stockData');
const companyData = require('../mockAPI/company');
const quoteData = require('../mockAPI/quote');

router.get('/search/:searchInput', async (req, res) => {
  console.log(req.params.searchInput);
  const search = req.params.searchInput.substring(1);
  console.log('search =' + search);

  const fetchData = await fetch(
    'https://api.iextrading.com/1.0/ref-data/symbols'
  );
  const data = await fetchData.json();
  console.log('data =' + data);

  res.json('yes');
});

router.get('/data', async (req, res) => {
  if (stockData) {
    res.send(stockData);
  }
});

router.get('/company', async (req, res) => {
  if (companyData) {
    res.send(companyData);
  }
});

router.get('/quote', async (req, res) => {
  if (quoteData) {
    res.send(quoteData);
  }
});

module.exports = router;
