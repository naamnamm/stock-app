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
import DoughnutChart from './DoughnutChart';
import { FaPlus, FaEdit, FaMinusCircle } from 'react-icons/fa';
import { useStock } from '../../context/SelectedStockContext';
const moment = require('moment');

import {
  calculateValue,
  getDates,
  getStartDate,
  formatNumber,
} from '../../utils/helperFunction';
import AddWatchlist from './AddWatchlist';
import { AuthContext } from '../../context/AuthContext';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

const Dashboard = () => {
  const [currentValue, setCurrentValue] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);
  const { selectedStock, setSelectedStock } = useStock();
  const [watchlist, setWatchlist] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [currentCashBalance, setCurrentCashBalance] = useState('');
  const [currentHoldings, setCurrentHoldings] = useState([]);
  const [currentHoldingValue, setCurrentHoldingValue] = useState([]);
  const [doughnutLabel, setDoughnutLabel] = useState(['loading']);
  const [doughnutData, setDoughnutData] = useState([0]);
  const [chartData, setChartData] = useState('');

  const userid = user ? user.id : null;

  const chartdata = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAdd = () => {
    setIsEditClicked(false);
    setModalOpen(true);
  };

  const handleDelete = async (stockid) => {
    console.log(stockid);
    const userid = user.id;
    const response = await fetch(
      `/api/watchlist/delete/:${stockid}/:${userid}`,
      {
        method: 'DELETE',
      }
    );
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
                >
                  <FaMinusCircle />
                </Button>
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

  const displayCurrentHolding = currentHoldings
    ? currentHoldings.map((item) => {
        //debugger;
        return (
          <ListGroup.Item action onClick={() => setSelectedStock(item.symbol)}>
            <Link to={`/stock/${item.symbol}`} className='d-flex'>
              <div className='stock-left text-left'>
                <div className='font-weight-bold'>{item.symbol}</div>
                <div className='text-muted'>{item.quantity} Shares</div>
              </div>
              <div className='stock-right ml-auto'>
                <div className=''> ${formatNumber(item.holdingValue)} </div>
                <div className='text-right'>
                  ${formatNumber(item.gainLoss)}{' '}
                </div>
              </div>
            </Link>
          </ListGroup.Item>
        );
      })
    : null;

  const getCurrentHoldings = async () => {
    const response = await fetch(`/api/currentHoldings/${userid}`);
    const data = await response.json();

    //console.log('current holding', data);
    setCurrentHoldingValue(calculateValue(data));
    setCurrentHoldings(data);
  };

  const getWatchlist = async () => {
    //    const userid = user.id;
    //console.log(userid);
    const response = await fetch(`/api/watchlist/${userid}`);
    const data = await response.json();

    setWatchlist(data);
  };

  const getCashBalance = async () => {
    const userid = user.id;
    //console.log(userid);
    const response = await fetch(`/api/cashBalance/${userid}`);
    const data = await response.json();
    //console.log(data);

    setCurrentCashBalance(data.cashAvailableToTrade);
  };

  //if label and data - display doughnut
  //else label = [loading], data = [0]

  const getDoughnutChart = () => {
    if (currentCashBalance && currentHoldings) {
      //map [] to display doughnut chart
      //label = [TWTR, AAL, Cash]
      const mappedData = currentHoldings.map((item) => item.holdingValue);
      mappedData.push(currentCashBalance);
      //console.log(mappedData);
      setDoughnutData(mappedData);
      const mappedLabel = currentHoldings.map((item) => item.symbol);
      mappedLabel.push('cash');
      //console.log(mappedLabel);
      setDoughnutLabel(mappedLabel);

      //data = [holdingValue TWTR, holdingValue AAL, cash]
      console.log(currentCashBalance, currentHoldings);

      setChartData({
        labels: mappedLabel,
        datasets: [
          {
            label: '# of Votes',
            data: mappedData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
    // const data = await response.json();

    // setChartData(data);
  };

  //const displayChart = chartData ? <Doughnut data={chartData} /> : null;

  useEffect(() => {
    if (!user) {
      return;
    }

    getWatchlist();
    getCashBalance();
    getCurrentHoldings();
  }, [user]);

  useEffect(() => {
    getDoughnutChart();
  }, [currentCashBalance, currentHoldings]);

  useEffect(() => {}, []);

  return (
    <>
      <SearchNav setSelectedStock={setSelectedStock} />
      <div className='main-container d-flex mx-auto mt-3'>
        <div className='left-container mx-2'>
          <div className='holder-summary d-flex'>
            <Card className='w-50'>
              <Card.Body>
                <Card.Title>
                  ${currentHoldingValue && currentHoldingValue.totalValue}
                </Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Current Value
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Card className='w-50'>
              <Card.Body>
                <Card.Title>
                  ${currentHoldingValue && currentHoldingValue.gainLoss}
                </Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Gain/Loss
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
          <Card>{chartData ? <Doughnut data={chartData} /> : null}</Card>
          <Card>
            <h2>Portfolio Details</h2>
            <p>Buying Power</p>
            <p>{currentCashBalance}</p>
          </Card>
          <Line
            data={chartdata}
            options={{
              title: {
                display: true,
                text: 'Current Portfolio value',
                fontSize: 25,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>

        <div className='right-container mr-2'>
          <Card>
            <Card.Header className='d-flex'>
              <Card.Title className='text-left mb-0'>
                Current Holding
              </Card.Title>
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

            <ListGroup variant='flush'>{displayCurrentHolding}</ListGroup>
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
