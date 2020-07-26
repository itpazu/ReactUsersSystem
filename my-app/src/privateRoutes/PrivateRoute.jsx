import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import Context from '../context/Context';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        context.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    ></Route>
  );
};

export const LoginRoute = ({ component: Component, ...rest }) => {
  const context = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        !context.isAuthenticated ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to='/' />
        )
      }
    ></Route>
  );
};
