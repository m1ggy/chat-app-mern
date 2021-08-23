import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useStore } from '../hooks/useStore';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useStore((state) => state.user);
  const history = useHistory();
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user.authenticated ? (
          <Component {...props} />
        ) : (
          history.push({
            pathname: '/',
            message: 'Please log in to access this page.',
          })
        );
      }}
    ></Route>
  );
}
