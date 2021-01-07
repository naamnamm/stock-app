const path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const stockData = require('./mockAPI/stockData');
const companyData = require('./mockAPI/company');
const quoteData = require('./mockAPI/quote');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/stocks/search/:searchInput', async (req, res) => {
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

app.get('/stock/data', async (req, res) => {
  if (stockData) {
    res.send(stockData);
  }
});

app.get('/stock/company', async (req, res) => {
  if (companyData) {
    res.send(companyData);
  }
});

app.get('/stock/quote', async (req, res) => {
  if (quoteData) {
    res.send(quoteData);
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));
