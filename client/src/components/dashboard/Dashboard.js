import React from 'react';
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
import './Dashboard.css';

const Dashboard = ({ handleLogin }) => {
  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='#home'>Infovest</Navbar.Brand>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-primary'>Search</Button>
        </Form>

        <Nav className='ml-auto'>
          <Nav.Link href='/dashboard'>Portfolio</Nav.Link>
          <Nav.Link href='/stocks'>Order</Nav.Link>
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

      <div className='main-container d-flex mx-auto mt-3'>
        <div className='left-container mx-2'>
          <Card className='w-50'>
            <Card.Body>
              <Card.Title> $3,917.88</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                -$53.23 (-1.33%) Today
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <Card>
            <h2>Portfolio Graph</h2>
          </Card>
          <Card>
            <h2>Portfolio Details</h2>
            <p>Buying Power</p>
          </Card>
        </div>

        <div className='right-container mr-2'>
          <Card>
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

            <Card.Header className='text-left'>My Watched Lists</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item action href='#link1'>
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item action href='#link2'>
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item action href='#link3'>
                Vestibulum at eros
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
