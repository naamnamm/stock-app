import React, { useState, useEffect, useRef } from 'react';
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
import './Dashboard.css';
import { Link } from 'react-router-dom';
import SearchNav from './SearchNav';

const Dashboard = ({ setSelectedStock, handleLogin, refs }) => {
  useEffect(() => {
    refs.inputRef.current.addEventListener('click', (e) => {
      if (refs.inputRef) {
        e.stopPropagation();
        refs.ulRef.current.style.display = 'flex';
      }
    });

    document.addEventListener('click', (e) => {
      if (refs.ulRef) {
        refs.ulRef.current.style.display = 'none';
      }
    });
  }, []);

  return (
    <div>
      <SearchNav
        setSelectedStock={setSelectedStock}
        handleLogin={handleLogin}
        refs={refs}
      />

      <div className='main-container d-flex mx-auto mt-3'>
        <div className='left-container mx-2'>
          <Card className='w-50'>
            <Card.Body>
              <Card.Title> $3,917.88</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                -$53.23 (-1.33%) Today
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <Card>
            <h2>Portfolio Graph</h2>
          </Card>
          <Card>
            <h2>Portfolio Details</h2>
            <p>Buying Power</p>
          </Card>
        </div>

        <div className='right-container mr-2'>
          <Card>
            <Card.Header className='d-flex'>
              <Card.Title className='text-left mb-0'>My Stocks</Card.Title>
              <DropdownButton
                id='dropdown-basic-button'
                title=''
                className='ml-auto pt-0'
                variant='outline-dark'
              >
                <Dropdown.Item href='/stocks'>Buy</Dropdown.Item>
                <Dropdown.Item href='/stocks'>Sell</Dropdown.Item>
              </DropdownButton>
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item action href='/stocks/AAPL' className='d-flex'>
                <div>AAPL</div>
                <div className='ml-auto'> 1 share @ $130 </div>
              </ListGroup.Item>
              <ListGroup.Item action href='/stocks/TSLA'>
                TSLA
              </ListGroup.Item>
              <ListGroup.Item action href='/stocks/AAL'>
                AAL
              </ListGroup.Item>
            </ListGroup>

            <Card.Header className='text-left'>My Watched Lists</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item action href='#link1'>
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item action href='#link2'>
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item action href='#link3'>
                Vestibulum at eros
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// const handleSearch = async () => {
//   console.log(searchInput);
//   if (!searchInput) return;

//   try {
//     const response = await fetch(`/stocks/search/:${searchInput}`);
//     const msgData = await response.json();

//     if (response.ok) {
//       console.log('response from a server =', msgData);
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   setSearchInput('');
// };
