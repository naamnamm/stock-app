require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/transfer', require('./routes/transfer'));
app.use('/api/watchlist', require('./routes/watchlist'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/currentHoldings', require('./routes/currentHoldings'));
app.use('/api/cashBalance', require('./routes/cashBalance'));
//app.use('/api/position', require('./routes/position'));
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/assetChart', require('./routes/assetChart'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));
