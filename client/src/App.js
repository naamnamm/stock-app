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

function App() {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              isAuthenticated ? <Dashboard {...props} /> : <Redirect to='/' />
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
