import React, { useEffect, useRef, useState, useContext } from 'react';
import './Balance.css';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

const Balance = () => {
  const transferRef = useRef();
  const [transferHistory, setTransferHistory] = useState([]);
  const { user } = useContext(UserContext);

  console.log(user);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const amount = transferRef.current.value;
    console.log(amount);
    console.log(user);

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, user, type: 'transfer-in' }),
      };

      const response = await fetch('/transfer', config);
      const data = await response.json();

      console.log(data.transaction);
      setTransferHistory(data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const currentBalance = transferHistory
    ? transferHistory
        .map((t) => {
          console.log(t);
          return Number(t.amount);
        })
        .reduce((acc, cur) => acc + cur, 0)
    : null;
  console.log(currentBalance);

  //when refreshing the page i want to pull the data from database and display it
  useEffect(() => {
    const userid = user.id;

    fetch(`/transfer/:${userid}`)
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        setTransferHistory(data);
      });
  }, [user]);

  return (
    <>
      <div className='cash-main-container d-flex mx-auto mt-3'>
        <div className='left-container balance-summary mr-3'>
          <h3 className='text-left'>Current balance</h3>
          <div>
            <hr />{' '}
          </div>
          <p> You have ${currentBalance} to trade</p>
          <h3 className='text-left'>Transfer History</h3>
          <div>
            <hr />{' '}
          </div>
          <div>
            {transferHistory
              ? transferHistory.map((t) => {
                  return (
                    <div className='d-flex'>
                      <div> {t.type}</div>
                      <div className='ml-auto'> {t.amount}</div>
                    </div>
                  );
                })
              : null}
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
