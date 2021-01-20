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
import { OptionsContext, OptionsUpdateContext } from './context/optionsContext';

//need to usecontext with login usernameRef, ulRef, inputRef, selectedstock
//export const optionContext = React.createContext();

export default function App() {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [selectedStock, setSelectedStock] = useState([]);
  const [balance, setBalance] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);

  const searchValue = useMemo(() => ({ searchInput, setSearchInput }), [
    searchInput,
    setSearchInput,
  ]);
  const optionsValue = useMemo(() => ({ options, setOptions }), [
    options,
    setOptions,
  ]);

  useEffect(() => {
    // refs.inputRef.current.addEventListener('click', (e) => {
    //   if (refs.inputRef) {
    //     e.stopPropagation();
    //     refs.ulRef.current.style.display = 'flex';
    //   }
    // });

    document.addEventListener('click', (e) => {
      if (options) {
        setOptions([]);
      }
    });
  }, []);

  // const ulRef = useRef();
  // const inputRef = useRef();

  console.log(selectedStock);

  return (
    <div className='App'>
      <Router>
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
                <Login
                  {...props}
                  user={user.toString()}
                  handleLogin={setIsAuthenticated}
                />
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
                  user={user.toString()}
                  handleSignup={setIsSignedUp}
                />
              ) : (
                <Redirect to='/login' />
              )
            }
          />

          <OptionsContext.Provider value={searchValue}>
            <OptionsUpdateContext.Provider value={optionsValue}>
              <Route
                exact
                path='/dashboard'
                render={(props) =>
                  isAuthenticated ? (
                    <Dashboard
                      {...props}
                      handleLogin={setIsAuthenticated}
                      setSelectedStock={setSelectedStock}
                      //refs={{ ulRef, inputRef }}
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
                      //refs={{ ulRef, inputRef }}
                    />
                  ) : (
                    <Redirect to='/dashboard' />
                  )
                }
              />

              <Route
                exact
                path='/balance'
                render={(props) => (
                  <Balance
                    {...props}
                    handleLogin={setIsAuthenticated}
                    setSelectedStock={setSelectedStock}
                    //refs={{ ulRef, inputRef }}
                    handleBalance={setBalance}
                  />
                )}
              />
            </OptionsUpdateContext.Provider>
          </OptionsContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}
