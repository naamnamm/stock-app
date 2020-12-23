import React from 'react';
import {
  Container,
  FormControl,
  Nav,
  Form,
  Button,
  Navbar,
  Card,
} from 'react-bootstrap';

const dashboard = () => {
  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='#home'>Infovest</Navbar.Brand>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-primary'>Search</Button>
        </Form>

        <Nav className='ml-auto'>
          <Nav.Link href='#features'>Portfolio</Nav.Link>
          <Nav.Link href='#home'>Order</Nav.Link>
          <Nav.Link href='#pricing'>Account</Nav.Link>
        </Nav>
      </Navbar>

      <div className='d-flex mx-auto w-75'>
        <div className='left-container w-75'>
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

        <div className='right-container w-25'>
          <Card>
            <h2>Stocks</h2>
            <h2>Lists</h2>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
