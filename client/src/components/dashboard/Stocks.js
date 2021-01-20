import React, { useEffect, useState } from 'react';
import SearchNav from './SearchNav';
import Transaction from './Transaction';
import { Chart } from 'react-google-charts';
import './Stocks.css';
import moment from 'moment';
import {
  ButtonGroup,
  Button,
  Card,
  Tabs,
  Tab,
  ButtonToolbar,
} from 'react-bootstrap';

const Stocks = ({ setSelectedStock, selectedStock, handleLogin, refs }) => {
  const [stock, setStock] = useState('');
  const [chart, setChart] = useState([]);
  const [company, setCompany] = useState('');
  const [quote, setQuote] = useState('');

  //console.log(selectedStock);

  const getStock = async () => {
    //const url = `https://sandbox.iexapis.com/stable/stock/${selectedStock.toLowerCase()}/batch?types=quote,news,chart&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`;
    // const url = `https://sandbox.iexapis.com/stable/stock/AAPL/batch?types=quote,news,chart&token=Tpk_46da5c418ebb4881aa02973b23cda9d8`;
    // const response = await fetch(url);
    const response = await fetch('/stock/data');
    const data = await response.json();

    setStock(data);
    console.log(data.quote.latestPrice);

    const mappedArr = data.chart.map((item) => [
      // moment(item.date).format('MMM'),
      new Date(item.date),
      item.open,
    ]);
    mappedArr.unshift(['date', 'price']);

    console.log(mappedArr);
    console.log(moment('2020-12-07').format('ll'));
    setChart(mappedArr);
  };

  const getCompany = async () => {
    const response = await fetch('/stock/company');
    const data = await response.json();
    console.log(data);
    setCompany(data);
  };

  const getQuote = async () => {
    const response = await fetch('/stock/quote');
    const data = await response.json();
    console.log(data);
    setQuote(data);
  };

  const displayCompanyName = company ? company.company.companyName : null;

  const displayChart = chart ? (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType='LineChart'
      loader={<div>Loading Chart</div>}
      data={chart}
      //title={}
      options={{
        colors: ['#e0440e'],
        chartArea: {
          left: 50,
          top: 30,
          bottom: 40,
          right: 60,
          width: '80%',
          height: '100%',
        },
        legend: 'none',
        // vAxis: {
        //   gridlines: {
        //     color: 'transparent',
        //   },
        // },
        // hAxis: {
        //   gridlines: {
        //     color: 'transparent',
        //   },
        // },
        timeline: {
          groupByRowLabel: true,
        },
        hAxis: {
          format: 'M/d/yy',
          // gridlines: { count: 15 },
        },
        vAxis: {
          gridlines: { color: 'none' },
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  ) : null;

  useEffect(() => {
    // refs.inputRef.current.addEventListener('click', (e) => {
    //   if (refs.inputRef) {
    //     e.stopPropagation();
    //     refs.ulRef.current.style.display = 'flex';
    //   }
    // });

    // document.addEventListener('click', (e) => {
    //   if (refs.ulRef) {
    //     refs.ulRef.current.style.display = 'none';
    //   }
    // });
    getStock();
    getCompany();
    getQuote();
  }, []);

  return (
    <>
      <SearchNav
        setSelectedStock={setSelectedStock}
        handleLogin={handleLogin}
        //refs={refs}
      />
      <div className='stock-main-container d-flex mx-auto mt-3'>
        <div>
          <div className='text-left header-graph-container'>
            {company ? company.company.companyName : null}
          </div>
          <div className='text-left header-graph-container'>
            $ {stock ? stock.quote.latestPrice : null}
          </div>
          {displayChart}
          <ButtonToolbar aria-label='Toolbar with button groups'>
            <ButtonGroup className='range-container' aria-label='First group'>
              <Button className='range-selection'>1D</Button>{' '}
              <Button className='range-selection'>1W</Button>{' '}
              <Button className='range-selection'>1M</Button>{' '}
              <Button className='range-selection'>3M</Button>{' '}
              <Button className='range-selection'>1Y</Button>{' '}
              <Button className='range-selection'>5Y</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div className='right-container'>
          <Card className=''>
            {/* <Card.Header className='d-flex'>
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
            </Card.Header> */}
            <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example'>
              <Tab eventKey='home' title='Buy'>
                <Transaction />
              </Tab>
              <Tab eventKey='profile' title='Sell'>
                <Transaction />
              </Tab>
            </Tabs>
          </Card>
        </div>
      </div>

      <div className='company-info-container mx-auto mt-4'>
        <Card>
          <Card.Header>About</Card.Header>
          <Card.Body>
            <p className='text-left about-text'>
              {company ? company.company.description : null}
            </p>
            <div className='upper-container d-flex mx-auto'>
              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>CEO</Card.Title>
                  <Card.Text>{company ? company.company.CEO : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }} className='info-text'>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Headquarters</Card.Title>
                  <Card.Text>{company ? company.company.city : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className='lower-container d-flex mx-auto'>
              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Market Cap</Card.Title>
                  <Card.Text>{quote ? quote.marketCap : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Price-Earnings Ratio</Card.Title>
                  <Card.Text>{quote ? quote.peRatio : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Dividend Yield</Card.Title>
                  <Card.Text>{quote ? quote.open : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Dividend Yield</Card.Title>
                  <Card.Text>{quote ? quote.open : null}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Stocks;
