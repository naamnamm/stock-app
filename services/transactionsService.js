const {
  getCashBalanceByUserId,
  updateCashBalanceByUserId,
} = require('../database/dbCashBalance');
const { createFilledOrderByUserId } = require('../database/dbOrder');
const {
  createOrUpdateBuyingHoldingByUserId,
  updateSellingHoldingByUserId,
  searchExistingHoldingByUserId,
  deleteHoldingByUserId,
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

  await updateCashBalanceByUserId(purchaseValue, userid);

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

  await updateCashBalanceByUserId(-sellingValue, userid);

  await createFilledOrderByUserId(symbol, type, quantity, price, userid);

  const holding = await updateSellingHoldingByUserId(
    symbol,
    quantity,
    price,
    userid
  );

  if (Number(holding.quantity) === 0) {
    await deleteHoldingByUserId(symbol, userid);
  }

  return { successMsg: `Your ${type}ing order has been filled` };
};

module.exports = { buyingTransaction, sellingTransaction };
