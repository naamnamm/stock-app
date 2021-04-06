import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Stocks from './components/dashboard/Stocks';
import Balance from './components/dashboard/Balance';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login-signup/Login';
import Signup from './components/login-signup/Signup';
import Order from './components/dashboard/Order';
import PrivateRoute from './PrivateRoute';
import { OptionsProvider } from './context/optionsContext';
import { SelectedStockProvider } from './context/SelectedStockContext';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [balance, setBalance] = useState('');
  //const { user, setUser, isAuth, setIsAuth } = useAuth();

  console.log(user, isAuth);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  const verifyToken = async () => {
    try {
      const response = await fetch('/api/auth/verify-token', {
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

  useEffect(() => {
    verifyToken();
  }, []);

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
