const transactionsService = require('../services/transactionsService');

const post = async (req, res) => {
  const { type } = req.body;

  if (type === 'buy') {
    try {
      const buyingTransaction = await transactionsService.buyingTransaction(
        req.body
      );
      res.send(buyingTransaction);
    } catch (error) {
      console.log(error);
      res.status(error.status).send({ errorMessage: error.message });
    }
  }

  if (type === 'sell') {
    try {
      const sellingTransaction = await transactionsService.sellingTransaction(
        req.body
      );
      res.send(sellingTransaction);
    } catch (error) {
      console.log(error);
      res.status(error.status).send({ errorMessage: error.message });
    }
  }
};

module.exports = { post };
