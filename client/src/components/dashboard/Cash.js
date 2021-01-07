import React from 'react';
import SearchNav from './SearchNav';
import './Cash.css';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';

const Cash = ({ setSelectedStock, handleBalance, handleLogin, refs }) => {
  return (
    <>
      <SearchNav
        setSelectedStock={setSelectedStock}
        handleLogin={handleLogin}
        refs={refs}
      />

      <div className='cash-main-container d-flex mx-auto mt-3'>
        <div className='left-container balance-summary mr-3'>
          <h3 className='text-left'>Current balance</h3>
          <div>
            <hr />{' '}
          </div>
          <h3 className='text-left'>Transfer History</h3>
          <div>
            <hr />{' '}
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
                  Price
                </Form.Label>

                <Col sm={8} className='pl-3 pr-0'>
                  <Form.Control
                    type='number'
                    placeholder='$0.00'
                    className='number-input'
                  />
                </Col>
              </Form.Group>

              <Button variant='success' type='submit' className='my-3'>
                Confirm Transfer
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cash;
