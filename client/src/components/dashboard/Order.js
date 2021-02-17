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
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOptions, useOptionsUpdate } from '../../context/optionsContext';
import { UserContext } from '../../context/UserContext';

const Order = () => {
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

        <p> You don't have any filled orders</p>
      </div>
    </>
  );
};
export default Order;
