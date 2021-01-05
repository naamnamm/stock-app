import React, { useEffect, useState } from 'react';
import SearchNav from './SearchNav';
import { Chart } from 'react-google-charts';
import stockimage from '../images/stock.png';
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

const Stocks = ({ setSelectedStock, selectedStock, handleLogin, refs }) => {
  const [stock, setStock] = useState('');
  const [chart, setChart] = useState([]);

  console.log(selectedStock);

  // const getStock = async () => {
  //   const url = `https://sandbox.iexapis.com/stable/stock/${selectedStock.toLowerCase()}/batch?types=quote,news,chart&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`;

  //   const response = await fetch(url);
  //   const data = await response.json();

  //   setStock(data);
  //   console.log(data);

  //   const mappedArr = data.chart.map((item) => [item.date, item.open]);
  //   mappedArr.unshift(['date', 'price']);

  //   setChart(mappedArr);
  // };

  const companyName = stock ? stock.quote.companyName : null;

  // const displayChart = chart ? (
  //   <Chart
  //     width={'600px'}
  //     height={'400px'}
  //     chartType='LineChart'
  //     loader={<div>Loading Chart</div>}
  //     data={chart}
  //     title={companyName}
  //     options={{
  //       hAxis: {
  //         title: 'Date',
  //       },
  //       vAxis: {
  //         title: 'Price',
  //       },
  //     }}
  //     rootProps={{ 'data-testid': '1' }}
  //   />
  // ) : null;

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

  // useEffect(() => {
  //   if (selectedStock) {
  //     getStock();
  //   }
  // }, [selectedStock]);

  return (
    <>
      <SearchNav
        setSelectedStock={setSelectedStock}
        handleLogin={handleLogin}
        refs={refs}
      />
      <div>stock page</div>
      {/* <div>{companyName}</div> */}
      <div>Apple INc</div>
      <div className='d-flex mx-auto'>
        {/* <div> {displayChart} </div> */}
        <div>
          {' '}
          <img src={stockimage} alt='stock-image' />{' '}
        </div>
        <div className='right-container'>
          <Card className='mt-3'>
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
          </Card>
        </div>
      </div>
    </>
  );
};

export default Stocks;
