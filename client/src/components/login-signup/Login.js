import React, { useState, useRef, useContext } from 'react';
import { Form, Button, Navbar, Card } from 'react-bootstrap';
//import { useAuth } from '../../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';
import './Login-Signup.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaStarAndCrescent } from 'react-icons/fa';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const usernameRef = useRef();
  const passwordRef = useRef();
  //const { setUser, setIsAuth } = useAuth();
  const { setUser, setIsAuth } = useContext(AuthContext);
  const history = useHistory();

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

      const response = await fetch('/api/auth/login', config);
      const loginData = await response.json();

      if (!response.ok) {
        setErrorMsg(loginData.error.message);
      } else {
        localStorage.setItem('accessToken', JSON.stringify(loginData.token));
        setIsAuth(true);
        setUser(loginData);
        history.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      <Card className='login-container mx-auto mt-4'>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {errorMsg ? <div className='text-danger'>{errorMsg}</div> : null}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group id='username' className='text-left text-muted'>
              <Form.Label>
                <h5>Username</h5>{' '}
              </Form.Label>
              <Form.Control
                type='username'
                placeholder='Username'
                ref={usernameRef}
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

            <Button type='submit'>Login</Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  );
};

export default Login;
