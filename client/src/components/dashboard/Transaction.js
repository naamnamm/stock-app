import React, { useEffect, useRef, useState, useContext } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import './Transaction.css';
import useQuery from '../../utils/Hooks/UseQuery';

import { AuthContext } from '../../context/AuthContext';
//import { useAuth } from '../../context/AuthContext';

function formatNum(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const Transaction = ({ type, currentPrice, setOrderMsg, orderMsg }) => {
  const quantityRef = useRef();
  const query = useQuery();
  const [selectedStock, setSelectedStock] = useState(query.get('stock'));
  const [currentBalance, setCurrentBalance] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);

  //const { user } = useAuth();
  const { user } = useContext(AuthContext);

  console.log('type', type);
  console.log('currentprice', currentPrice);
  console.log('currentBalance', currentBalance);
  console.log('maxQuantity', maxQuantity);

  const getCashBalance = async () => {
    const userid = user.id;
    const response = await fetch(`/api/cashBalance/${userid}`);
    const data = await response.json();

    setCurrentBalance(data.cashAvailableToTrade);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (quantity > maxQuantity || quantity <= 0) {
      setOrderMsg({ errorMsg: 'Invalid quantity' });
      return;
    }

    try {
      const data = {
        symbol: selectedStock,
        type,
        quantity: quantityRef.current.value,
        price: currentPrice,
        userid: user.id,
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      setLoading(true);
      const response = await fetch('/api/orders', config);
      const orderData = await response.json();

      console.log(orderData);

      if (!response.ok) {
        setOrderMsg(orderData);
      } else {
        setOrderMsg(orderData);
        setQuantity('');
        await getCashBalance();
        await getPosition();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //note
  // 1.when component first mount, currentBalance is '' && currentPrice is null
  // 2. await currentBalance from fetch request
  // 3. await currentPrice from parent component
  // Question - once we get currentBalance & currentPrice, why useEffect on mount doesn't run?
  // that's why I set up useEffect [currentBalance] && [currentPrice].
  const getMaxQuantity = () => {
    console.log(
      'max',
      currentBalance,
      currentPrice,
      currentBalance && currentPrice
    );

    if (type === 'buy') {
      if (!(currentBalance && currentPrice)) {
        return;
      }
      const maxQuantityToBuy = currentBalance / currentPrice;

      setMaxQuantity(maxQuantityToBuy);
    }

    if (type === 'sell') {
      const maxQuantityToSell = position ? position : null;

      setMaxQuantity(maxQuantityToSell);
    }
  };

  useEffect(() => {
    if (!currentPrice) return;

    getMaxQuantity();
  }, [currentPrice]);

  useEffect(() => {
    getMaxQuantity();
  }, [currentBalance]);

  //note
  //when I select different stock from the searchbar
  //position doesn't get updated
  //That's why I set up useEffect [selectedStock].

  const getPosition = async () => {
    const userid = user.id;

    //console.log(userid);
    const response = await fetch(
      `/api/currentHoldings/${userid}/${selectedStock}`
    );
    const data = await response.json();

    if (!data.msg) {
      setPosition(data);
    } else {
      setPosition('');
    }
  };

  //note
  // 1. when I change type to sell, maxQuantity to sell doens't get updated.
  // 2. That's why I set up useEffect [type].
  useEffect(() => {
    getMaxQuantity();
    getPosition();
  }, [type]);

  useEffect(() => {
    console.log(query.get('stock'));
    const selectedStock = query.get('stock');
    setSelectedStock(selectedStock);

    //when we actually get data from parent, this doesn't get re-render
    // without useEffect(variable change) - position, maxQuantity don't get updated
    // getMaxQuantity();
    // getPosition();
  }, [query.get('stock')]);

  useEffect(() => {
    if (!selectedStock) return;

    getPosition();
  }, [selectedStock]);

  useEffect(() => {
    if (!user) return;
    getCashBalance();
    getPosition();
  }, [user]);

  useEffect(() => {
    const totalTransactionValue = quantity * currentPrice;
    setTotal(totalTransactionValue);

    if (orderMsg.errorMsg) {
      setOrderMsg('');
    }
  }, [quantity]);

  return (
    <div>
      {position ? <Card>Position: {position} stocks</Card> : null}
      <Form className='my-2' onSubmit={handleOrderSubmit}>
        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalAmount'
        >
          <Form.Label column sm={4} className='px-0'>
            Quantity
          </Form.Label>

          <Col sm={8} className='pl-3 pr-0'>
            <Form.Control
              type='number'
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              placeholder='0.00'
              ref={quantityRef}
              Required
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={4} className='px-0'>
            Price
          </Form.Label>

          <Col sm={8} className='pl-3 pr-0'>
            <Form.Control
              type='number'
              placeholder={currentPrice}
              className='number-input'
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={8} className='px-0'>
            Max quantity to {type}
          </Form.Label>

          <Col sm={4} className='pl-3 pr-0'>
            <Form.Control
              plaintext
              readOnly
              defaultValue='0'
              value={maxQuantity ? parseFloat(maxQuantity).toFixed(2) : '0'}
              className='text-right'
            />
          </Col>
        </Form.Group>

        <hr className='total-line mx-auto my-1' />

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={6} className='px-0 font-weight-bold'>
            Total
          </Form.Label>

          <Col sm={6} className='pl-3 pr-0'>
            <Form.Control
              plaintext
              readOnly
              defaultValue='0'
              value={total ? formatNum(total) : '0'}
              className='text-right font-weight-bold'
            />
          </Col>
        </Form.Group>

        <Button
          variant='success'
          type='submit'
          className='my-3'
          //disabled={!loading}
        >
          {/* disable if it's still loading */}
          {type} now
        </Button>
      </Form>

      <hr />
      <Form.Label className='label-alert mb-3'>
        ${currentBalance} available to trade
      </Form.Label>
    </div>
  );
};

export default Transaction;

// useEffect(() => {
//   const selectedStock = query.get('stock');
//   setSelectedStock(selectedStock);
//   getPosition();
// }, [query.get('stock')]);

// useEffect(() => {
//   if (!currentPrice && !currentBalance) return;
//   //debugger;

//   getMaxQuantity();
// }, [currentPrice, currentBalance]);

// // useEffect(() => {
// //   if (!selectedStock) return;

// //   getPosition();
// // }, [selectedStock]);

// useEffect(() => {
//   //debugger;
//   if (user.length === 0) return;
//   getCashBalance();
//   getPosition();
// }, [user]);

// useEffect(() => {
//   const totalTransactionValue = quantity * currentPrice;
//   setTotal(totalTransactionValue);
//   setOrderMsg('');
// }, [quantity]);

// useEffect(() => {
//   //debugger;
//   getPosition();
//   getMaxQuantity();
// }, [type]);
