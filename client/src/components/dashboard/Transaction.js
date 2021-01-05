import React from 'react';
import {
  ListGroup,
  FormControl,
  Nav,
  Form,
  Button,
  Navbar,
  Card,
  DropdownButton,
  Dropdown,
  Col,
  Row,
} from 'react-bootstrap';
import './Transaction.css';

const Transaction = () => {
  return (
    <div>
      <Form className='my-2'>
        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalAmount'
        >
          <Form.Label column sm={4} className='px-0'>
            Amount
          </Form.Label>

          <Col sm={8} className='pl-3 pr-0'>
            <Form.Control type='number' placeholder='0.00' />
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

        <hr className='total-line mx-auto my-1' />

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={6} className='px-0 font-weight-bold'>
            Est. Quantity
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
          Review Order
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
