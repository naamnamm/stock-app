import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    ></Route>
  );
}
