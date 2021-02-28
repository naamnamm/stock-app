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
import PrivateRoute from './PrivateRoute';

import { OptionsProvider } from './context/optionsContext';
import { SelectedStockProvider } from './context/SelectedStockContext';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [selectedStock, setSelectedStock] = useState([]);
  const [balance, setBalance] = useState('');
  //const { user, setUser, isAuth, setIsAuth } = useAuth();

  console.log(selectedStock);
  console.log(user, isAuth);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };
  //debugger;
  const verifyToken = async () => {
    //debugger;
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
        setIsAuth(true);
        setUser(data);
        setLoading(false);
      } else {
        setIsAuth(false);
        setUser('');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBalance = async () => {
    const userid = user.id;
    console.log(userid);
    const response = await fetch(`/api/transfer/${userid}`);
    const data = await response.json();
    console.log(data);

    const currentBalance = data
      ? data
          .map((t) => {
            //console.log(t);
            return Number(t.amount);
          })
          .reduce((acc, cur) => acc + cur, 0)
      : null;
    console.log(currentBalance);
    setBalance(currentBalance);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    getBalance();
  }, [user]);

  return (
    <div className='App'>
      <Router>
        <AuthContext.Provider value={value}>
          {/* <AuthProvider> */}
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <SelectedStockProvider>
              <OptionsProvider>
                {isAuth && <SearchNav setSelectedStock={setSelectedStock} />}
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/stock' component={Stocks} />
                <PrivateRoute path='/balance' component={Balance} />
                <PrivateRoute path='/order' component={Order} />
              </OptionsProvider>
            </SelectedStockProvider>
          </Switch>
          {/* </AuthProvider> */}
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

{
  /* {isAuth ? (
                <SearchNav
                  setSelectedStock={setSelectedStock}
                  //handleLogin={setIsAuthenticated}
                />
              ) : null} */
}

{
  /* <Route
                exact
                path='/order'
                render={(props) =>
                  isAuth ? (
                    <Order
                      {...props}
                      //handleLogin={setIsAuthenticated}
                      setSelectedStock={setSelectedStock}
                      handleBalance={setBalance}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              /> */
}
