import React, { useState, useRef } from 'react';
import { Form, Button, Col, Navbar, Nav } from 'react-bootstrap';
import './Login-Signup.css';

const Signup = ({ handleSignup }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
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

      const response = await fetch('/signup', config);
      console.log(response);
      const signupData = await response.json();
      console.log(signupData);

      !response.ok ? setErrorMsg(signupData) : handleSignup(true);
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
      <div className='signup-container mx-auto'>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='username'
                placeholder='Enter Username'
                ref={usernameRef}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                ref={passwordRef}
                required
              />
            </Form.Group>
          </Form.Row>

          {errorMsg
            ? errorMsg.map((err) => (
                <div className='text-danger'>{err.message}</div>
              ))
            : null}

          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder='1234 Main St' />
          </Form.Group>

          <Form.Group controlId='formGridAddress2'>
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder='Apartment, studio, or floor' />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>State</Form.Label>
              <Form.Control as='select' defaultValue='Choose...'>
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id='formGridCheckbox'>
            <Form.Check type='checkbox' label='Agree to our terms' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Signup
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
