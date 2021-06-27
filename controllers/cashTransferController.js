const {
  getCashTransferByUserId,
  createCashTransferByUserId,
} = require('../database/dbCashTransfer');
const { updateCashBalanceByUserId } = require('../database/dbCashBalance');

const get = async (req, res) => {
  const { userid } = req.params;

  res.send(await getCashTransferByUserId(userid));
};

const post = async (req, res) => {
  const { amount, user, type } = req.body;

  try {
    await createCashTransferByUserId(type, amount, user.id);

    await updateCashBalanceByUserId(amount, user.id);

    const transferHistory = await getCashTransferByUserId(user.id);

    res.status(201).send({ msg: 'success', transaction: transferHistory });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get, post };
