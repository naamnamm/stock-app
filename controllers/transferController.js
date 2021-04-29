const pool = require('../database/dbPool');
const {
  getCashTransferByUserId,
  createCashTransferByUserId,
} = require('../database/dbCashTransfer');
const { createCashBalanceByUserId } = require('../database/dbCashBalance');

const get = async (req, res) => {
  const { userid } = req.params;

  res.send(await getCashTransferByUserId(userid));

  // if (transferHistory) {
  //   res.send(JSON.stringify(transferHistory.rows));
  // }
};

const post = async (req, res) => {
  const { amount, user, type } = req.body;

  try {
    // first insert transaction into cash_transfer
    await createCashTransferByUserId(type, amount, user.id);

    //then insert transaction into cash_balance
    await createCashBalanceByUserId(type, amount, user.id);

    const transferHistory = await getCashTransferByUserId(user.id);

    res.status(201).send({ msg: 'success', transaction: transferHistory });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get, post };
