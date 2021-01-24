import React, { useState, useRef } from 'react';
import { Form, Button, Navbar, Nav, Col, Row } from 'react-bootstrap';
import './Login-Signup.css';

const Login = ({ handleLogin, setUser }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username: usernameRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch('/login', config);
      const loginData = await response.json();

      console.log(loginData);

      if (!response.ok) {
        setErrorMsg(loginData.error.message);
      } else {
        localStorage.setItem('accessToken', JSON.stringify(loginData.token));
        handleLogin(true);
        setUser(loginData);
        //setAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group as={Row} controlId='formHorizontalEmail'>
            <Form.Label column sm={3} className='text-left'>
              Username
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='username'
                placeholder='Username'
                ref={usernameRef}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={3} className='text-left'>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='password'
                placeholder='Password'
                ref={passwordRef}
              />
            </Col>
          </Form.Group>
          {errorMsg ? <div className='text-danger'>{errorMsg}</div> : null}
          <Button type='submit'>Login</Button>
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
