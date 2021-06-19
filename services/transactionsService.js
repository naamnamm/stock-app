const {
  getCashBalanceByUserId,
  createCashTransactionByUserId,
} = require('../database/dbCashBalance');
const { createOrderByUserId } = require('../database/dbOrder');
const {
  createHoldingByUSerId,
  searchExistingHoldingByUserId,
  sellHoldingByUSerId,
} = require('../database/dbCurrentHolding');

const buyingTransaction = async (reqBody) => {
  const { symbol, type, quantity, price, userid } = reqBody;

  const cashBalanceRows = await getCashBalanceByUserId(userid);

  const cashAvailableToTrade = functions.calculateCashAvailable(
    cashBalanceRows
  );

  const purchaseValue = quantity * price;

  if (purchaseValue > cashAvailableToTrade) {
    const error = new Error('not enough cash to trade');
    error.status = 403;
    throw error;
  }

  await createCashTransactionByUserId(type, -Math.abs(purchaseValue), userid);

  await createOrderByUserId(symbol, type, quantity, price, userid);

  await createHoldingByUSerId(symbol, quantity, price, userid);

  return { successMsg: `Your ${type}ing order has been filled` };
};

const sellingTransaction = async () => {
  const { symbol, type, quantity, price, userid } = reqBody;

  const existingHolding = searchExistingHoldingByUserId(symbol, userid);

  if (!existingHolding) {
    const error = new Error('no holding found');
    error.status = 403;
    throw error;
  }

  if (Number(existingHolding) < Number(quantity)) {
    const error = new Error('not enough amount to sell');
    error.status = 403;
    throw error;
  }

  const sellingValue = quantity * price;
  //ok
  await createCashTransactionByUserId(type, sellingValue, userid);
  //ok
  await createOrderByUserId(symbol, type, quantity, price, userid);
  //ok
  await sellHoldingByUSerId(symbol, quantity, price, userid);

  return { successMsg: `Your ${type}ing order has been filled` };
};

module.exports = { buyingTransaction, sellingTransaction };
