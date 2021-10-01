import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    ></Route>
  );
}
