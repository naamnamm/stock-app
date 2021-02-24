import React, { useState, useRef, useEffect, useContext } from 'react';
import { Modal, Form, Button, ListGroup, FormControl } from 'react-bootstrap';
import { useOptions, useOptionsUpdate } from '../../context/optionsContext';
import { useAuth } from '../../context/AuthContext';

const AddWatchlist = ({ closeModal, setWatchlist }) => {
  const [searchInput, setSearchInput] = useState('');
  const [stocks, setStocks] = useState([]);
  const [options, setOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { user, setUser, isAuth, setIsAuth } = useAuth();

  const inputRef = useRef();
  const ulRef = useRef();

  //console.log(searchInput);
  //console.log(user);

  const handleAdd = async (symbol) => {
    // e.preventDefault();
    //console.log(user.id);
    try {
      const data = {
        symbol,
        userid: user.id,
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch('/watchlist', config);
      const watchlistData = await response.json();

      if (!response.ok) {
        setErrorMsg(watchlistData);
        setOptions([]);
      } else {
        closeModal();
        //console.log(watchlistData);
        setWatchlist(watchlistData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //filter and update options
    setErrorMsg('');

    if (searchInput.length === 0) {
      setSearchInput('');
      setOptions([]);
    } else {
      //console.log(searchInput);
      const filterSymbol = stocks
        .filter((s) => s.symbol.includes(searchInput.toUpperCase()))
        .slice(0, 3);

      const filterName = stocks
        .filter((s) => s.name.includes(searchInput.toUpperCase()))
        .slice(0, 3);

      const mergeArr = [...filterSymbol, ...filterName];

      setOptions(mergeArr);
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

  //onclick of the selected stock
  //ins

  return (
    <>
      <Modal.Header closeButton>Add Stock to watchlist</Modal.Header>
      <Modal.Body>
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
        {errorMsg
          ? errorMsg.map((err) => (
              <div className='text-danger'>{err.message}</div>
            ))
          : null}
        <ListGroup
          id='results-watchlist'
          className='option-container ml-0'
          ref={ulRef}
        >
          {options.length > 0
            ? options.map((option, index) => {
                //console.log(option);
                return (
                  <ListGroup.Item
                    key={index + 1000}
                    className='ul-watchlist d-flex'
                    action
                    onClick={() => handleAdd(option.symbol)}
                  >
                    <div>{option.symbol}</div>
                    <div className='ml-2'>-</div>
                    <div className='ml-2'>{option.name}</div>
                  </ListGroup.Item>
                );
              })
            : null}
        </ListGroup>
      </Modal.Body>
    </>
  );
};

export default AddWatchlist;
