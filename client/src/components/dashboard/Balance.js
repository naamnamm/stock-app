import React, { useEffect, useRef, useState } from 'react';
import './Balance.css';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';

const Balance = ({ user }) => {
  const transferRef = useRef();
  const [transferHistory, setTransferHistory] = useState([]);

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

  return (
    <>
      <div className='cash-main-container d-flex mx-auto mt-3'>
        <div className='left-container balance-summary mr-3'>
          <h3 className='text-left'>Current balance</h3>
          <div>
            <hr />{' '}
          </div>
          <p> You have $0 to trade</p>
          <h3 className='text-left'>Transfer History</h3>
          <div>
            <hr />{' '}
          </div>
          <div>
            {transferHistory
              ? transferHistory.map((t) => {
                  return <div> {t.amount}</div>;
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
