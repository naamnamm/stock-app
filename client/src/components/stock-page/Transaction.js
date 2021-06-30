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

  const getCashBalance = async () => {
    const userid = user.id;
    const response = await fetch(`/api/cashBalance/${userid}`);
    const data = await response.json();

    setCurrentBalance(data.amount);
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
      const response = await fetch('/api/transactions', config);
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

  const getMaxQuantity = () => {
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

  const getPosition = async () => {
    const userid = user.id;

    const response = await fetch(
      `/api/currentHoldings/${userid}/${selectedStock}`
    );
    const data = await response.json();

    if (!data.errorMessage) {
      setPosition(data.quantity);
    } else {
      setPosition('');
    }
  };

  useEffect(() => {
    getMaxQuantity();
    getPosition();
    getCashBalance();
  }, [type]);

  useEffect(() => {
    console.log(query.get('stock'));
    const selectedStock = query.get('stock');
    setSelectedStock(selectedStock);
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

  function handleQuantityChange(e) {
    const newQuantity = e.target.value;
    const totalTransactionValue = newQuantity * currentPrice;

    setQuantity(newQuantity);
    setTotal(totalTransactionValue);
  }

  //https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/

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
              onChange={handleQuantityChange}
              value={quantity}
              placeholder='0.00'
              ref={quantityRef}
              required
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
