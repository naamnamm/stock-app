import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login-signup/Login';
import Signup from './components/login-signup/Signup';

function App() {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);

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
            path='/dashboard'
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} handleLogin={setIsAuthenticated} />
              ) : (
                <Redirect to='/' />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
