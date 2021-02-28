import React, { useEffect, useRef, useState, useContext } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './Transaction.css';
import { useStock } from '../../context/SelectedStockContext';
import { AuthContext } from '../../context/AuthContext';

const Transaction = ({ type, currentPrice, setOrderMsg }) => {
  console.log(type);
  const quantityRef = useRef();
  const { selectedStock, setSelectedStock } = useStock();
  //const [msg, setMsg] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);

  const getBalance = async () => {
    const userid = user.id;
    console.log(userid);
    const response = await fetch(`/api/transfer/${userid}`);
    const data = await response.json();
    console.log(data);

    const currentBalance = data
      ? data
          .map((t) => {
            //console.log(t);
            return Number(t.amount);
          })
          .reduce((acc, cur) => acc + cur, 0)
      : null;
    console.log(currentBalance);
    setCurrentBalance(currentBalance);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    //const price = currentPrice

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

      console.log(orderData);

      if (!response.ok) {
        setOrderMsg(orderData);
      } else {
        setOrderMsg(orderData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [user]);

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
            <Form.Control type='number' placeholder='0.00' ref={quantityRef} />
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
          <Form.Label column sm={6} className='px-0'>
            Max quantity
          </Form.Label>

          <Col sm={6} className='pl-3 pr-0'>
            <Form.Control
              plaintext
              readOnly
              defaultValue='0'
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
        $3,766.19 Available - Sell All
      </Form.Label>
    </div>
  );
};

export default Transaction;
