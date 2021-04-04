import React, { useState, useEffect, useRef, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOptions, useOptionsUpdate } from '../../context/optionsContext';
import { AuthContext } from '../../context/AuthContext';
import SearchNav from './SearchNav';
import { useStock } from '../../context/SelectedStockContext';

const moment = require('moment');

const Order = () => {
  const [orders, setOrders] = useState('');
  const { user } = useContext(AuthContext);
  const { selectedStock, setSelectedStock } = useStock();

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
          return (
            <tr>
              <td>{moment(item.created_at).format('MMM Do YY')}</td>
              <td>{item.symbol}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.value}</td>
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

      if (data.length > 0) {
        setOrders(data);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <SearchNav setSelectedStock={setSelectedStock} />
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
