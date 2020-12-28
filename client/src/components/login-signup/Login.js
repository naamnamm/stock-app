import React from 'react';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
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
      <div className='login-container mx-auto'>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' className='mx-sm-3' id='inputUsername' />
            <Form.Text id='passwordHelpBlock' muted>
              Enter your username
            </Form.Text>

            <Form.Label htmlFor='inputPassword6'>Password</Form.Label>
            <Form.Control
              type='password'
              className='mx-sm-3'
              id='inputPassword6'
              aria-describedby='passwordHelpInline'
            />
            <Form.Text id='passwordHelpBlock' muted>
              Must be 8-20 characters long.
            </Form.Text>
          </Form.Group>
          <Button type='submit' onClick={() => handleLogin(true)}>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
