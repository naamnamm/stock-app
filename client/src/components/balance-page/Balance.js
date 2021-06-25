import React, { useEffect, useRef, useState, useContext } from 'react';
import './Balance.css';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import SearchNav from '../dashboard-page/SearchNav';

//import { useAuth } from '../../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';

const Balance = () => {
  const transferRef = useRef();
  const [cashTransferHistory, setCashTransferHistory] = useState('');
  const [currentCashBalance, setCurrentCashBalance] = useState('');

  //const { user, setUser, isAuth, setIsAuth } = useAuth();
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const amount = transferRef.current.value;

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, user, type: 'transfer-in' }),
      };

      const response = await fetch('/api/cashTransfer', config);
      const data = await response.json();

      console.log(data);

      setCashTransferHistory(data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const getCashBalance = async () => {
    const userid = user.id;
    const response = await fetch(`/api/cashBalance/${userid}`);
    const data = await response.json();
    setCurrentCashBalance(data.amount);
  };

  const getCashTransfer = async () => {
    const userid = user.id;
    const response = await fetch(`/api/cashTransfer/${userid}`);
    const data = await response.json();

    console.log(data);

    if (data.length > 0) {
      setCashTransferHistory(data);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    getCashBalance();
    getCashTransfer();
  }, [user]);

  useEffect(() => {
    if (!cashTransferHistory) {
      return;
    }

    getCashBalance();
  }, [cashTransferHistory]);

  return (
    <>
      <SearchNav />
      <div className='cash-main-container d-flex mx-auto mt-3'>
        <div className='left-container balance-summary mr-3'>
          <h3 className='text-left'>Current Cash Balance</h3>
          <div>
            <hr />{' '}
          </div>
          <p>
            {' '}
            You have ${currentCashBalance ? currentCashBalance : 0} to trade
          </p>
          <h3 className='text-left'>Cash Transfer History</h3>
          <div>
            <hr />{' '}
          </div>
          <div>
            {cashTransferHistory ? (
              cashTransferHistory.map((t) => {
                return (
                  <div className='d-flex'>
                    <div> {t.type}</div>
                    <div className='ml-auto'> {t.amount}</div>
                  </div>
                );
              })
            ) : (
              <div> No cash transfer history </div>
            )}
          </div>
        </div>
        <div className='right-container'>
          <Card>
            <Card.Header> Transfer </Card.Header>
            <Form>
              <Form.Group
                as={Row}
                className='row-buy-sell px-3 py-2'
                controlId='formHorizontalAmount'
              >
                <Form.Label column sm={4} className='px-0'>
                  From
                </Form.Label>

                <Col sm={8} className='pl-3 pr-0'>
                  <Form.Control
                    type='text'
                    placeholder='Bank Account'
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className='row-buy-sell px-3 py-2'
                controlId='formHorizontalPrice'
              >
                <Form.Label column sm={4} className='px-0'>
                  To
                </Form.Label>

                <Col sm={8} className='pl-3 pr-0'>
                  <Form.Control
                    type='text'
                    placeholder='Stock Account'
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='row-buy-sell px-3 py-2'
                controlId='formHorizontalPrice'
              >
                <Form.Label column sm={4} className='px-0'>
                  Amount
                </Form.Label>

                <Col sm={8} className='pl-3 pr-0'>
                  <Form.Control
                    type='number'
                    placeholder='$0.00'
                    className='number-input'
                    ref={transferRef}
                  />
                </Col>
              </Form.Group>

              <Button
                variant='success'
                type='submit'
                className='my-3'
                onClick={(e) => handleTransfer(e)}
              >
                Confirm Transfer
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Balance;
