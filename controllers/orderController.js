const pool = require('../database/dbPool');
const functions = require('../utils/calculateValue');
const { getOrderByUserId } = require('../database/dbOrder');
const { getCashBalanceByUserId } = require('../database/dbCashBalance');

const get = async (req, res) => {
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
};

const post = async (req, res) => {
  const { symbol, type, quantity, price, userid } = req.body;

  try {
    // if type = buy
    if (type === 'buy') {
      //1. get total cash balance from cash balance table
      const cashBalanceRows = await getCashBalanceByUserId(userid);

      //2. map + reduce cash available.rows
      const cashAvailableToTrade = functions.calculateCashAvailable(
        cashBalanceRows
      );

      const purchaseValue = quantity * price;

      //3. can proceed if you have enough cash to trade
      if (purchaseValue > cashAvailableToTrade) {
        res.send({
          errorMsg:
            'cash balance not enough to trade, please add more cash to your account',
        });
        return;
      } else {
        // 3.1 insert into cash balance (update cash) to reflect buying transaction
        //console.log('user have enough cash to buy');
        await pool.query(
          'INSERT INTO cash_balance (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
          [type, -Math.abs(purchaseValue), userid]
        );
      }

      //4. insert into orders - this is buying order
      const orderFilled = await pool.query(
        'INSERT INTO orders (symbol, type, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [symbol, type, quantity, price, userid]
      );

      if (orderFilled) {
        // do update if symbol exist otherwise insert new row
        await pool.query(
          'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) + (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity + EXCLUDED.quantity), quantity = currentHoldings.quantity + EXCLUDED.quantity RETURNING *',
          [symbol, quantity, price, userid]
        );
      }
    }

    // if type = sell
    if (type === 'sell') {
      debugger;
      //1. check if symbol in current holding exist
      const existingHolding = await pool.query(
        'SELECT quantity FROM currentHoldings WHERE symbol = $1',
        [symbol]
      );
      //--if no existing holding > return
      if (!existingHolding) {
        res.send({ errorMsg: 'no existing holding found' });
        return;
      }

      //--if yes - check to see if amount is valid
      if (
        existingHolding &&
        Number(existingHolding.rows[0].quantity) < Number(quantity)
      ) {
        //can't sell because quantity in the database is less than quantity sell
        res.send({ errorMsg: 'not enough amount to sell' });
        return;
      } else {
        //update current holding - do update if existing else insert new row
        await pool.query(
          'INSERT INTO currentHoldings (symbol, quantity, purchasePrice, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, user_id) DO UPDATE SET purchaseprice = ((currentHoldings.purchaseprice * currentHoldings.quantity) - (EXCLUDED.purchaseprice * EXCLUDED.quantity))/(currentHoldings.quantity - EXCLUDED.quantity), quantity = currentHoldings.quantity - EXCLUDED.quantity RETURNING *',
          [symbol, quantity, price, userid]
        );
      }

      const sellingValue = quantity * price;

      //2. insert into cash balance to reflect cash from selling stock
      await pool.query(
        'INSERT INTO cash_balance (type, amount, user_id) VALUES ($1, $2, $3) RETURNING *',
        [type, sellingValue, userid]
      );

      //3. insert into orders to reflect sell order
      await pool.query(
        'INSERT INTO orders (symbol, type, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [symbol, type, quantity, price, userid]
      );
    }

    res.send({
      successMsg: `Your ${type}ing order has been filled`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get, post };
