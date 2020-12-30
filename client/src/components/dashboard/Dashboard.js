import React, { useState, useEffect } from 'react';
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
import Stocks from './Stocks';

const Dashboard = ({ handleLogin }) => {
  const [searchInput, setSearchInput] = useState('');
  const [stocks, setStocks] = useState([]);
  const [options, setOptions] = useState([]);

  console.log(searchInput);
  console.log(options);

  useEffect(() => {
    //filter and update options
    if (searchInput === 0) {
      setSearchInput('');
      setOptions('');
    } else {
      console.log(searchInput);
      const filterSearch = stocks
        .filter((s) => s.symbol.includes(searchInput.toUpperCase()))
        .slice(0, 6);

      console.log(filterSearch);
      setOptions(filterSearch);
    }
    //handleSearch();
  }, [searchInput]);

  useEffect(() => {
    const getStocksList = async () => {
      try {
        const response = await fetch(
          'https://api.iextrading.com/1.0/ref-data/symbols'
        );
        const data = await response.json();
        console.log(data);
        setStocks(data);
      } catch (error) {
        console.log(error);
      }
    };

    getStocksList();
  }, []);

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

  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='#home'>Infovest</Navbar.Brand>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search Symbol'
            id='search-bar'
            className='mr-sm-2'
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form>

        <Nav className='ml-auto'>
          <Nav.Link href='/dashboard'>Portfolio</Nav.Link>
          <Nav.Link href='/stocks'>Order</Nav.Link>
          <DropdownButton
            title='Account'
            variant='outline-secondary'
            menuAlign='right'
            id='dropdown-menu-align-right'
          >
            <Dropdown.Item href='#/action-1'>Account</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Help Center</Dropdown.Item>
            <Dropdown.Item as='button' onClick={() => handleLogin(false)}>
              Log Out
            </Dropdown.Item>
          </DropdownButton>
        </Nav>
      </Navbar>
      <ListGroup id='results' className='option-container'>
        {options.map((option) => {
          return (
            <ListGroup.Item action>
              {option.symbol} {option.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

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
