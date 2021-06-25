const express = require('express');
const router = express.Router();
const { getOrderByUserId } = require('../database/dbOrder');
const functions = require('../utils/functions');

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    const allOrders = await getOrderByUserId(userid);

    const mappedOrders = allOrders.map((item) => {
      return functions.createOrderModel(item);
    });

    res.send(mappedOrders);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
