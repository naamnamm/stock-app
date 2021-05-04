import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Navbar, Card } from 'react-bootstrap';
import './Login-Signup.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaStarAndCrescent } from 'react-icons/fa';

const Signup = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

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

      const response = await fetch('/api/auth/signup', config);
      console.log(response);
      const signupData = await response.json();
      console.log(signupData);

      !response.ok ? setErrorMsg(signupData) : history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errorMsg) {
      setErrorMsg('');
    }
  }, [username]);

  return (
    <>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>
          <Link to='/'>
            {' '}
            Galaxy Trading <FaStarAndCrescent />
          </Link>
        </Navbar.Brand>
      </Navbar>

      <Card className='signup-container mx-auto my-4'>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>

          {errorMsg ? (
            <div className='text-danger'>{errorMsg.errorMessage}</div>
          ) : null}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='username' className='text-left text-muted'>
              <Form.Label>
                <h5>Username</h5>{' '}
              </Form.Label>
              <Form.Control
                type='username'
                placeholder='Enter Username'
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameRef}
                required
              />
            </Form.Group>
            <Form.Group id='password' className='text-left text-muted'>
              <Form.Label>
                <h5>Password</h5>
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                ref={passwordRef}
                required
              />{' '}
            </Form.Group>

            <Form.Group id='formGridCheckbox'>
              <Form.Check type='checkbox' label='Agree to our terms' />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  );
};

export default Signup;
