import React from 'react';
import { Jumbotron, Nav, Form, Button, Navbar } from 'react-bootstrap';
import stockimage from '../images/landingpage-image.png';
import { Link } from 'react-router-dom';
import { FaStarAndCrescent } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>
          <Link to='/'>
            {' '}
            Galaxy Trading <FaStarAndCrescent />
          </Link>
        </Navbar.Brand>
        <Form inline className='ml-auto'>
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
            <p>Tools that put your money in motion.</p>
            <p>Trade Till' your profit reach the moon and back</p>
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
