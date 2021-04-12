import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  ListGroup,
  FormControl,
  Nav,
  Form,
  Button,
  Navbar,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOptions, useOptionsUpdate } from '../../context/optionsContext';
import './SearchNav.css';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { FaStarAndCrescent } from 'react-icons/fa';

const SearchNav = ({ setSelectedStock }) => {
  const { searchInput, setSearchInput } = useOptions();
  const [stocks, setStocks] = useState([]);
  const { options, setOptions } = useOptionsUpdate();
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);
  const history = useHistory();

  const inputRef = useRef();
  const ulRef = useRef();

  const setLoggedOut = async () => {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.name }),
      };

      const response = await fetch('/api/auth/logout', config);

      if (response.ok) {
        setIsAuth(false);
        localStorage.removeItem('accessToken');
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchInput.length === 0) {
      setSearchInput('');
      setOptions([]);
    } else {
      const filterSymbol = stocks
        .filter((s) => s.symbol.includes(searchInput.toUpperCase()))
        .slice(0, 3);

      const filterName = stocks
        .filter((s) => s.name.includes(searchInput.toUpperCase()))
        .slice(0, 3);

      const mergeArr = [...filterSymbol, ...filterName];

      setOptions(mergeArr);
    }
  }, [searchInput]);

  useEffect(() => {
    inputRef.current.addEventListener('click', (e) => {
      if (inputRef) {
        e.stopPropagation();
        ulRef.current.style.display = 'flex';
      }
    });

    document.addEventListener('click', (e) => {
      if (!ulRef.current) {
        return;
      }

      if (ulRef) {
        ulRef.current.style.display = 'none';
      }
    });

    const getStocksList = async () => {
      try {
        const response = await fetch(
          'https://api.iextrading.com/1.0/ref-data/symbols'
        );
        const data = await response.json();

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
          Galaxy Trading <FaStarAndCrescent />
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
          <Button className='navbar-link' variant='outline-secondary'>
            <Link to='/dashboard' className='navbar-link'>
              Portfolio
            </Link>
          </Button>
          <Button className='navbar-link' variant='outline-secondary'>
            <Link to='/balance' className='navbar-link'>
              Balance
            </Link>
          </Button>
          <Button className='navbar-link' variant='outline-secondary'>
            <Link to='/order' className='navbar-link'>
              Order
            </Link>
          </Button>
          <DropdownButton
            title='Account'
            variant='outline-secondary'
            menuAlign='right'
            id='dropdown-menu-align-right'
          >
            <Dropdown.Item href='#/action-1'>Account</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Help Center</Dropdown.Item>
            <Dropdown.Item as='button' onClick={() => setLoggedOut()}>
              Log Out
            </Dropdown.Item>
          </DropdownButton>
        </Nav>
      </Navbar>
      <ListGroup id='results' className='option-container' ref={ulRef}>
        {options.length > 0
          ? options.map((option, index) => {
              //console.log(option);
              return (
                <ListGroup.Item
                  key={index + 100}
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
