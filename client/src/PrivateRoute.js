import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isAuth } = useAuth();

  console.log(user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    ></Route>
  );
}

//isAuth === true - doesn't work
//https://stackoverflow.com/questions/60861816/private-route-using-react-react-hooks
