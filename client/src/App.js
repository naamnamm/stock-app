import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Link, useParams, useLocation } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Stocks from './components/dashboard/Stocks';
import Balance from './components/dashboard/Balance';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login-signup/Login';
import Signup from './components/login-signup/Signup';
import Order from './components/dashboard/Order';
import PrivateRoute from './PrivateRoute';
import { OptionsProvider } from './context/optionsContext';
// import { AuthContext } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  // const [user, setUser] = useState([]);
  // const [isAuth, setIsAuth] = useState(false);
  //debugger;
  // const value = {
  //   user,
  //   setUser,
  //   isAuth,
  //   setIsAuth,
  // };

  // const verifyToken = async () => {
  //   try {
  //     const response = await fetch('/api/auth/verify-token', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${JSON.parse(
  //           localStorage.getItem('accessToken')
  //         )}`,
  //       },
  //     });

  //     const data = await response.json();

  //     if (data.isVerified === true) {
  //       setIsAuth(true);
  //       setUser(data);
  //       setLoading(false);
  //     } else {
  //       setIsAuth(false);
  //       setUser('');
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   verifyToken();
  // }, []);

  return (
    <div className='App'>
      <Router>
        {/* <AuthContext.Provider value={value}> */}
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <OptionsProvider>
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/balance' component={Balance} />
              <PrivateRoute path='/order' component={Order} />
              <PrivateRoute path='/stock' component={Stocks} />
            </OptionsProvider>
          </Switch>
        </AuthProvider>
        {/* </AuthContext.Provider> */}
      </Router>
    </div>
  );
}
