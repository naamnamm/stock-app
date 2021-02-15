import React, { useState, useEffect, useContext } from 'react';
import {
  ListGroup,
  Modal,
  Button,
  Card,
  DropdownButton,
  Dropdown,
  Form,
} from 'react-bootstrap';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import SearchNav from './SearchNav';
import { FaPlus, FaEdit, FaMinusCircle } from 'react-icons/fa';

import AddWatchlist from './AddWatchlist';
import { UserContext } from '../../context/UserContext';

const Dashboard = ({ setSelectedStock, handleLogin }) => {
  const [currentValue, setCurrentValue] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [watchlist, setWatchlist] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);

  //console.log(watchlist);

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

  const getWatchlist = async () => {
    const userid = user.id;
    console.log(userid);
    const response = await fetch(`/watchlist/:${userid}`);
    const data = await response.json();

    //console.log(data);
    setWatchlist(data);
  };

  const handleAdd = () => {
    setIsEditClicked(false);
    setModalOpen(true);
  };

  const handleDelete = async (stockid) => {
    console.log(stockid);
    const userid = user.id;
    const response = await fetch(`/watchlist/delete/:${stockid}/:${userid}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    setWatchlist(data.updatedWatchlist);
  };

  const displayWatchlist =
    !isEditClicked && watchlist ? (
      watchlist.map((item, index) => {
        return (
          <ListGroup.Item action key={index}>
            <Link to={`/stock/${item.symbol}`} className='d-flex'>
              <div className='font-weight-bold'>{item.symbol}</div>
              <div className='stock-right ml-auto'> Price</div>
            </Link>
          </ListGroup.Item>
        );
      })
    ) : isEditClicked && watchlist ? (
      watchlist.map((item, index) => {
        // Object.assign(item, { isChecked: false });
        // console.log(item);
        return (
          <ListGroup.Item action key={index + 50} className='d-flex'>
            {/* <Link to={`/stock/${item.symbol}`} className='d-flex'> */}
            <div>
              <Form.Group id='formBasicCheckbox' className='m-0'>
                <Button
                  className='delete-button mb-1'
                  variant='outline-danger'
                  onClick={() => handleDelete(item.id)}
                  //value={item.id}
                >
                  <FaMinusCircle />
                </Button>

                {/* <Form.Check
                  type='checkbox'
                  label={item.symbol}
                  onClick={(e) => handleDelete(e.target.value)}
                  value={item.id}
                /> */}
              </Form.Group>
            </div>
            <div className='font-weight-bold ml-2'>{item.symbol}</div>
            {/* <div className='font-weight-bold'>{item.symbol}</div> */}
            <div className='stock-right ml-auto'> Price</div>
            {/* </Link> */}
          </ListGroup.Item>
        );
      })
    ) : (
      <ListGroup.Item>Create watchlist</ListGroup.Item>
    );

  useEffect(() => {
    getWatchlist();
  }, [user]);

  useEffect(() => {
    //console.log('render');
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
                  onClick={() => handleAdd()}
                >
                  <FaPlus />
                </Button>
                <Button
                  className='add-button edit-button'
                  variant='outline-dark'
                  onClick={() => setIsEditClicked(!isEditClicked)}
                >
                  <FaEdit />
                </Button>
              </div>

              <Modal show={modalOpen} onHide={closeModal}>
                {modalOpen === true ? (
                  <AddWatchlist
                    closeModal={closeModal}
                    setWatchlist={setWatchlist}
                  />
                ) : null}
              </Modal>
            </Card.Header>
            <ListGroup variant='flush'>{displayWatchlist}</ListGroup>
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

// const handleEdit = (e) => {
//   console.log('clicked');
//   // if this is clicked
//   setIsEditClicked(true);
//   debugger;
//   // if (isEditClicked === true) {
//   if (watchlist) {
//     watchlist.map((item, index) => {
//       return (
//         <ListGroup.Item action key={index + 50}>
//           <Link to={`/stock/${item.symbol}`} className='d-flex'>
//             <div>
//               <Form.Group controlId='formBasicCheckbox'>
//                 <Form.Check type='checkbox' />
//               </Form.Group>
//             </div>
//             <div className='font-weight-bold'>{item.symbol}</div>
//             <div className='stock-right ml-auto'> Price</div>
//           </Link>
//         </ListGroup.Item>
//       );
//     });
//     // }
//   }
//   //---And if watchlist add checkbox to the front of the symbol
// };
