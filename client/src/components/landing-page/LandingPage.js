import React from 'react';
import { Jumbotron, Nav, Form, Button, Navbar } from 'react-bootstrap';
import stockimage from '../images/landingpage-image.png';

const LandingPage = () => {
  return (
    <>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='#home'>Infovest</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant='outline-primary' href='/login' className='mr-2'>
            Log In
          </Button>
          <Button variant='primary' href='/signup'>
            Sign up
          </Button>
        </Form>
      </Navbar>

      <Jumbotron>
        <div className='w-75 mx-auto d-flex'>
          <div className='text-left mr-5'>
            <h1>Investing for Everyone</h1>
            <p>
              Commission-free investing, plus the tools you need to put your
              money in motion.
            </p>
            <p>
              <Button variant='primary'>Sign Up</Button>
            </p>
          </div>

          <div>
            <img src={stockimage} height={300} alt='stock-image' />
          </div>
        </div>
      </Jumbotron>
      <Jumbotron> new update</Jumbotron>
    </>
  );
};

export default LandingPage;
