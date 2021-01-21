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
import {
  useRefContext,
  useOptions,
  useOptionsUpdate,
} from '../../context/optionsContext';
import './SearchNav.css';

const SearchNav = ({ setSelectedStock, handleLogin }) => {
  const { searchInput, setSearchInput } = useOptions();
  const [stocks, setStocks] = useState([]);
  const { options, setOptions } = useOptionsUpdate();
  const { inputRef, ulRef } = useRefContext();

  useEffect(() => {
    //filter and update options
    if (searchInput.length === 0) {
      setSearchInput('');
      setOptions([]);
    } else {
      //console.log(searchInput);
      const filterSearch = stocks
        .filter((s) => s.symbol.includes(searchInput.toUpperCase()))
        .slice(0, 6);

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
        //console.log(data);
        setStocks(data);
      } catch (error) {
        console.log(error);
      }
    };

    getStocksList();
  }, []);

  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>
          <Link to={'/dashboard'}>Infovest</Link>
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search Symbol'
            id='search-bar'
            className='mr-sm-2'
            onChange={(e) => setSearchInput(e.target.value)}
            ref={inputRef}
          />
        </Form>

        <Nav className='ml-auto'>
          <Nav.Link href='/dashboard'>Portfolio</Nav.Link>
          <Nav.Link href='/balance'>Balance</Nav.Link>
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
      <ListGroup id='results' className='option-container' ref={ulRef}>
        {options.length > 0
          ? options.map((option) => {
              console.log(option);
              return (
                <ListGroup.Item
                  action
                  onClick={() => setSelectedStock(option.symbol)}
                >
                  <Link to={`/stock/${option.symbol}`}>
                    {option.symbol} {option.name}
                  </Link>
                </ListGroup.Item>
              );
            })
          : null}
      </ListGroup>
    </div>
  );
};

export default SearchNav;
