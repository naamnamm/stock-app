import React, { useState, useEffect, useRef, useContext } from 'react';
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
  Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOptions, useOptionsUpdate } from '../../context/optionsContext';
import { AuthContext } from '../../context/AuthContext';
const moment = require('moment');

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);

  function calculateValue(quantity, price) {
    return (quantity * price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }

  const displayFilledOrder = orders ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Symbol</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item) => {
          console.log(item);
          return (
            <tr>
              <td>{moment(item.created_at).format('MMM Do YY')}</td>
              <td>{item.symbol}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                {calculateValue(Number(item.quantity), Number(item.price))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <p> You don't have any filled orders</p>
  );

  useEffect(() => {
    const userid = user.id;
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders/${userid}`);
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <div className='cash-main-container mt-3 mx-3'>
        <h3 className='text-left'>Open Orders</h3>
        <div>
          <hr />{' '}
        </div>
        <p> You don't have any open orders</p>
        <h3 className='text-left'>Filled Order</h3>
        <div>
          <hr />{' '}
        </div>

        {displayFilledOrder}
      </div>
    </>
  );
};

export default Order;
