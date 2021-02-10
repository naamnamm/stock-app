//functionality 1

import React, { useState, useEffect, useRef } from 'react';
import {
  ListGroup,
  Modal,
  Button,
  Card,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import SearchNav from './SearchNav';
import { FaPlus, FaEdit } from 'react-icons/fa';
import AddWatchlist from './AddWatchlist';

const Dashboard = ({ setSelectedStock, handleLogin, refs }) => {
  const [currentValue, setCurrentValue] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const displayChart = currentValue ? (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType='LineChart'
      loader={<div>Loading Chart</div>}
      data={currentValue}
      options={{
        title: 'Value (in dollars)',
        colors: ['#e0440e'],
        chartArea: {
          left: 50,
          top: 40,
          bottom: 40,
          right: 60,
          width: '80%',
          height: '100%',
        },
        legend: 'none',
        timeline: {
          groupByRowLabel: true,
        },
        hAxis: {
          format: 'M/d/yy',
          // gridlines: { count: 15 },
          gridlines: { color: 'none' },
        },
        vAxis: {
          // gridlines: { color: 'none' },
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  ) : null;

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setCurrentValue([
      ['x', 'dogs'],
      [0, 0],
      [1, 10],
      [2, 23],
      [3, 17],
      [4, 18],
      [5, 9],
      [6, 11],
      [7, 27],
      [8, 33],
      [9, 40],
      [10, 32],
      [11, 35],
    ]);
  }, []);

  return (
    <>
      <div className='main-container d-flex mx-auto mt-3'>
        <div className='left-container mx-2'>
          <div className='holder-summary d-flex'>
            <Card className='w-50'>
              <Card.Body>
                <Card.Title> $3,917.88</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Current Value
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Card className='w-50'>
              <Card.Body>
                <Card.Title> +$3,917.88</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Gain/Loss
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
          <Card>{displayChart}</Card>
          <Card>
            <h2>Portfolio Details</h2>
            <p>Buying Power</p>
            <p>$40</p>
          </Card>
        </div>

        <div className='right-container mr-2'>
          <Card>
            <Card.Header className='d-flex'>
              <Card.Title className='text-left mb-0'>Stocks</Card.Title>
              <DropdownButton
                id='dropdown-basic-button'
                title=''
                className='ml-auto pt-0'
                variant='outline-dark'
              >
                <Dropdown.Item href='/stock'>Buy</Dropdown.Item>
                <Dropdown.Item href='/stock'>Sell</Dropdown.Item>
              </DropdownButton>
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item action>
                <Link to='/stock/AAPL' className='d-flex'>
                  <div className='stock-left text-left'>
                    <div className='font-weight-bold'>AAPL</div>
                    <div className='text-muted'>1 Share</div>
                  </div>
                  <div className='stock-right ml-auto'>
                    <div className=''> $130 </div>
                  </div>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action href='/stocks/TSLA' className='d-flex'>
                <div className='stock-left text-left'>
                  <div className='font-weight-bold'>TSLA</div>
                  <div className='text-muted'>1 Share</div>
                </div>
                <div className='stock-right ml-auto'>
                  <div className=''> $130 </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href='/stocks/AAL' className='d-flex'>
                <div className='stock-left text-left'>
                  <div className='font-weight-bold'>AAL</div>
                  <div className='text-muted'>1 Share</div>
                </div>
                <div className='stock-right ml-auto'>
                  <div className=''> $130 </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className='mt-2'>
            <Card.Header className='d-flex'>
              <Card.Title className='text-left mb-0'>Watchlists</Card.Title>
              <div className='ml-auto'>
                <Button
                  className='add-button mr-2'
                  variant='outline-dark'
                  onClick={() => setModalOpen(true)}
                >
                  <FaPlus />
                </Button>
                <Button
                  className='add-button'
                  variant='outline-dark'
                  // onClick={(e) => handleTransfer(e)}
                >
                  <FaEdit />
                </Button>
              </div>

              <Modal show={modalOpen} onHide={closeModal}>
                {modalOpen === true ? (
                  <AddWatchlist closeModal={closeModal} />
                ) : null}
              </Modal>
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item action>
                <Link to='/stock/AAPL' className='d-flex'>
                  <div className='font-weight-bold'>AAPL</div>
                  <div className='stock-right ml-auto'> $130</div>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </>
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
