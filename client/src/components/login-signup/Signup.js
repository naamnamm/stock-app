import React from 'react';
import { Form, Button, Col, Navbar, Nav } from 'react-bootstrap';
import './Login-Signup.css';

const Signup = ({ handleSignup }) => {
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
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
          </Form.Row>

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

          <Button
            variant='primary'
            type='submit'
            onClick={() => handleSignup(true)}
          >
            Signup
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
