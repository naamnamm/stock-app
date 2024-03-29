import React, { useEffect, useState } from 'react';
import SearchNav from '../dashboard-page/SearchNav';
import ControlledTabs from './ControlledTabs';
import { Chart } from 'react-google-charts';
import './Stocks.css';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/function';
import { Card, Alert } from 'react-bootstrap';
import useQuery from '../../utils/Hooks/UseQuery';

const Stocks = () => {
  const [chart, setChart] = useState([]);
  const [company, setCompany] = useState('');
  const query = useQuery();
  const [selectedStock, setSelectedStock] = useState(query.get('stock'));
  const [orderMsg, setOrderMsg] = useState('');

  const fetchStock = async () => {
    const stockId = query.get('stock');
    const response = await fetch(`/api/stocks/search/${stockId}`);
    const data = await response.json();

    setChart(data.chartData);
    setCompany(data.companyData[0]);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  useEffect(() => {
    if (!selectedStock) return;
    if (selectedStock != query.get('stock')) {
      setSelectedStock(query.get('stock'));
    }

    fetchStock();
  }, [query.get('stock')]);

  const displayChart = chart ? (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType='LineChart'
      loader={<div>Loading Chart</div>}
      data={chart}
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
        timeline: {
          groupByRowLabel: true,
        },
        hAxis: {
          format: 'M/d/yy',
        },
        vAxis: {
          gridlines: { color: 'none' },
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  ) : null;

  return (
    <>
      <SearchNav />
      {orderMsg.successMsg ? (
        <Alert variant='success' className='w-75 mx-auto'>
          {orderMsg.successMsg}{' '}
          <Link to='/order'>Check all your orders here!</Link>
        </Alert>
      ) : orderMsg.errorMsg ? (
        <Alert variant='danger' className='w-75 mx-auto'>
          {orderMsg.errorMsg}{' '}
        </Alert>
      ) : null}

      <div className='stock-main-container d-flex mx-auto my-3'>
        <div>
          <div className='text-left header-graph-container'>
            {company ? company.companyName : null}
          </div>
          <div className='text-left header-graph-container'>
            {company ? company.price : null}
          </div>
          {displayChart}
        </div>

        <div className='right-container'>
          <Card className=''>
            <ControlledTabs
              currentPrice={company ? company.price : null}
              setOrderMsg={setOrderMsg}
              orderMsg={orderMsg}
            />
          </Card>
        </div>
      </div>

      <div className='company-info-container mx-auto my-4'>
        <Card>
          <Card.Header>About {company ? company.companyName : null}</Card.Header>
          <Card.Body>
            <div className='upper-container d-flex mx-auto'>
              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>CEO</Card.Title>
                  <Card.Text>{company ? company.ceo : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }} className='info-text'>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Headquarters</Card.Title>
                  <Card.Text>
                    {company
                      ? `${company.city}, ${company.state}, ${company.country}`
                      : null}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Industry</Card.Title>
                  <Card.Text>{company ? company.industry : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Sector</Card.Title>
                  <Card.Text>{company ? company.sector : null}</Card.Text>
                </Card.Body>
              </Card>
              
            </div>

            <div className='lower-container d-flex mx-auto'>

            <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Exchange</Card.Title>
                  <Card.Text>{company ? company.exchange : null}</Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Market Cap</Card.Title>
                  <Card.Text>
                    {company ? formatNumber(company.mktCap) : null}
                  </Card.Text>
                </Card.Body>
              </Card>
          
              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Average Daily Trading Volume</Card.Title>
                  <Card.Text>
                    {company ? formatNumber(company.volAvg) : null}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: '13rem' }}>
                <Card.Body className='info-text text-left'>
                  <Card.Title>Website</Card.Title>
                  <Card.Text>{company ? company.website : null}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Card.Body>

            <Card.Footer>
              <p class="card-text text-left">{company ? company.description : null}</p>
            </Card.Footer>
                    
        </Card>
      </div>
    </>
  );
};

export default Stocks;
