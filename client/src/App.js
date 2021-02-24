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
import { AuthProvider } from './context/AuthContext';

export default function App() {
  // const [user, setUser] = useState([]);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedStock, setSelectedStock] = useState([]);
  const [balance, setBalance] = useState('');
  //const { user, isAuth } = useAuth();

  console.log(selectedStock);

  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <OptionsProvider>
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/stock' component={Stocks} />
              <PrivateRoute path='/balance' component={Balance} />
            </OptionsProvider>
          </Switch>
        </AuthProvider>
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
