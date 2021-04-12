import React, { useState, useRef, useEffect, useContext } from 'react';
import { Modal, Form, Button, ListGroup, FormControl } from 'react-bootstrap';
import { useOptions, useOptionsUpdate } from '../../context/optionsContext';
import { AuthContext } from '../../context/AuthContext';

const AddWatchlist = ({ closeModal, setWatchlist }) => {
  const [searchInput, setSearchInput] = useState('');
  const [stocks, setStocks] = useState([]);
  const [options, setOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { user } = useContext(AuthContext);

  const inputRef = useRef();
  const ulRef = useRef();

  const handleAdd = async (symbol) => {
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

      const response = await fetch('/api/watchlist', config);
      const watchlistData = await response.json();

      if (!response.ok) {
        setErrorMsg(watchlistData);
        setOptions([]);
      } else {
        closeModal();
        setWatchlist(watchlistData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setErrorMsg('');

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
