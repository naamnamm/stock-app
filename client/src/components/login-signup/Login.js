import React from 'react';
import { Form, Button, Navbar, Nav, Col, Row } from 'react-bootstrap';
import './Login-Signup.css';

const Login = ({ handleLogin }) => {
  return (
    <>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='/'>Infovest</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
        </Nav>
      </Navbar>
      <div className='login-container mx-auto mt-4'>
        <Form>
          <Form.Group as={Row} controlId='formHorizontalEmail'>
            <Form.Label column sm={3} className='text-left'>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control type='email' placeholder='Email' />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={3} className='text-left'>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control type='password' placeholder='Password' />
            </Col>
          </Form.Group>
          <Button type='submit' onClick={() => handleLogin(true)}>
            Login
          </Button>
          <Form.Text id='passwordHelpBlock' muted className='mt-3'>
            Don't have an account
          </Form.Text>
          <div className='mt-3'>
            <Button href='/signup'>Create an Account</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
