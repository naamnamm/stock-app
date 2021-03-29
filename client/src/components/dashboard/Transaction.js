import React, { useEffect, useRef, useState, useContext } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './Transaction.css';
import { useStock } from '../../context/SelectedStockContext';
import { AuthContext } from '../../context/AuthContext';

function formatNum(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const Transaction = ({ type, currentPrice, setOrderMsg, position }) => {
  const quantityRef = useRef();
  const { selectedStock } = useStock();
  const [currentBalance, setCurrentBalance] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');
  const { user } = useContext(AuthContext);
  const [maxQuantity, setMaxQuantity] = useState('');

  const getCashBalance = async () => {
    const userid = user.id;
    const response = await fetch(`/api/cashBalance/${userid}`);
    const data = await response.json();

    setCurrentBalance(data.cashAvailableToTrade);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    //question 1 -
    //  do i calculate total and max quantity in here?
    //  should i handle if quantity > maxquantity in here?

    if (quantity > maxQuantity) {
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

      const response = await fetch('/api/orders', config);
      const orderData = await response.json();

      if (!response.ok) {
        setOrderMsg(orderData);
      } else {
        setOrderMsg(orderData);
        setQuantity('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxQuantity = () => {
    if (type === 'buy') {
      if (!(currentBalance && currentPrice)) {
        return;
      }
      const maxQuantityToBuy = currentBalance / currentPrice;

      console.log(maxQuantityToBuy);

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
    console.log('get max buy price');
  }, [currentPrice]);

  useEffect(() => {
    //if quantity change
    //recalculate total
    const totalTransactionValue = quantity * currentPrice;
    setTotal(totalTransactionValue);
  }, [quantity]);

  useEffect(() => {
    if (!user) return;
    getCashBalance();
  }, [user]);

  useEffect(() => {
    getMaxQuantity();
  }, [type]);

  return (
    <div>
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
              //value={maxQuantity ? formatNum(maxQuantity) : '0'}
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

        <Button variant='success' type='submit' className='my-3'>
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
