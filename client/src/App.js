import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Stocks from './components/dashboard/Stocks';
import Balance from './components/dashboard/Balance';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login-signup/Login';
import Signup from './components/login-signup/Signup';
import SearchNav from './components/dashboard/SearchNav';
import Order from './components/dashboard/Order';

import { OptionsProvider } from './context/optionsContext';
import { UserContext } from './context/UserContext';

//need to usecontext with login usernameRef, ulRef, inputRef, selectedstock
//export const optionContext = React.createContext();

export default function App() {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [selectedStock, setSelectedStock] = useState([]);
  const [balance, setBalance] = useState('');

  console.log(selectedStock);

  const verifyToken = async () => {
    try {
      const response = await fetch('/verify-token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('accessToken')
          )}`,
        },
      });

      const data = await response.json();

      if (data.isVerified === true) {
        setIsAuthenticated(true);
        setUser(data);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className='App'>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) =>
                !isAuthenticated ? (
                  <LandingPage {...props} />
                ) : (
                  <Redirect to='/dashboard' />
                )
              }
            />

            <Route
              exact
              path='/login'
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} handleLogin={setIsAuthenticated} />
                ) : (
                  <Redirect to='/dashboard' />
                )
              }
            />

            <Route
              exact
              path='/signup'
              render={(props) =>
                isSignedUp === false ? (
                  <Signup
                    {...props}
                    //user={user.toString()}
                    handleSignup={setIsSignedUp}
                  />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
            <OptionsProvider>
              {isAuthenticated ? (
                <SearchNav
                  setSelectedStock={setSelectedStock}
                  handleLogin={setIsAuthenticated}
                />
              ) : null}
              <Route
                exact
                path='/dashboard'
                render={(props) =>
                  isAuthenticated ? (
                    <Dashboard
                      {...props}
                      handleLogin={setIsAuthenticated}
                      setSelectedStock={setSelectedStock}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />

              <Route
                path='/stock'
                render={(props) =>
                  selectedStock ? (
                    <Stocks
                      {...props}
                      handleLogin={setIsAuthenticated}
                      setSelectedStock={setSelectedStock}
                      selectedStock={selectedStock}
                    />
                  ) : (
                    <Redirect to='/dashboard' />
                  )
                }
              />

              <Route
                exact
                path='/balance'
                render={(props) =>
                  isAuthenticated ? (
                    <Balance
                      {...props}
                      handleLogin={setIsAuthenticated}
                      setSelectedStock={setSelectedStock}
                      handleBalance={setBalance}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />

              <Route
                exact
                path='/order'
                render={(props) =>
                  isAuthenticated ? (
                    <Order
                      {...props}
                      handleLogin={setIsAuthenticated}
                      setSelectedStock={setSelectedStock}
                      handleBalance={setBalance}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />
            </OptionsProvider>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}
