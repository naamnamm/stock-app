const {
  getCashBalanceByUserId,
  createCashTransactionByUserId,
  updateCashBalanceByUserId,
} = require('../database/dbCashBalance');
const { createFilledOrderByUserId } = require('../database/dbOrder');
const {
  createOrUpdateBuyingHoldingByUserId,
  updateSellingHoldingByUserId,
  searchExistingHoldingByUserId,
} = require('../database/dbCurrentHolding');

const buyingTransaction = async (reqBody) => {
  const { symbol, type, quantity, price, userid } = reqBody;

  const cashBalance = await getCashBalanceByUserId(userid);

  const purchaseValue = quantity * price;

  if (purchaseValue > cashBalance.amount) {
    const error = new Error('not enough cash to trade');
    error.status = 403;
    throw error;
  }
  // to delete this
  //await createCashTransactionByUserId(type, -Math.abs(purchaseValue), userid);
  //need to fix this - to update cash balance
  await updateCashBalanceByUserId(purchaseValue, userid);
  // need to rename this to transaction
  await createFilledOrderByUserId(symbol, type, quantity, price, userid);

  await createOrUpdateBuyingHoldingByUserId(symbol, quantity, price, userid);

  return { successMsg: `Your ${type}ing order has been filled` };
};

const sellingTransaction = async (reqBody) => {
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

  //await createCashTransactionByUserId(type, -Math.abs(sellingValue), userid);
  //need to fix
  await updateCashBalanceByUserId(-sellingValue, userid);
  //need to fix
  await createFilledOrderByUserId(symbol, type, quantity, price, userid);

  await updateSellingHoldingByUserId(symbol, quantity, price, userid);

  return { successMsg: `Your ${type}ing order has been filled` };
};

module.exports = { buyingTransaction, sellingTransaction };
