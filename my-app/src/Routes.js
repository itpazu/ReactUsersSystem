import React, { useState, useEffect, Children } from 'react';
import { Switch } from 'react-router-dom';
import adminLayout from './Layouts/adminLayout/adminLayout';
import userLayout from './Layouts/userLayout/userLayout';
import cookie from 'js-cookie';
import { authenticateUser, LogIn } from './lib/api';
import Minimal from './Layouts/minimal/Minimal';
import Context from './context/Context';
import { PrivateRoute, LoginRoute } from './privateRoutes/PrivateRoute';

const Routes = (props) => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {}, []);

  const handleSubmittedForm = async (mail, pass) => {
    const userInput = { email: mail, password: pass };
    setUserInput(userInput);
    try {
      const response = await LogIn(userInput);
      setUserInput(response.data);
      const userId = response.data.user_id;
      const csrfToken = response.headers.authorization;
      //local server only
      const JwtToken = response.headers.token;
      cookie.set('user_id', userId);
      cookie.set('csrf_token', csrfToken);
      //local server only
      cookie.set('jwt_token', JwtToken);
      try {
        return await handleFetch();
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleFetch = async () => {
    const userId = cookie.get('user_id');
    const csrf = cookie.get('csrf_token');
    // for local development only
    const token = cookie.get('jwt_token'); ///error planting
    // const token = 'skjfdhhkjdsnhkjhdsf';

    try {
      //added token for local server only
      setIsAuthenticated(true);

      await authenticateUser({ user_id: userId }, csrf, token);
    } catch (error) {
      throw error;
    }
  };

  const LogOut = () => {
    setIsAuthenticated(false);
    cookie.remove('csrf_token');
  };
  console.log(userInput);
  return (
    <Context.Provider
      value={{ handleSubmittedForm, isAuthenticated, LogOut, userInput }}
    >
      <Switch>
        <PrivateRoute
          exact
          path='/'
          component={userInput.role === 'admin' ? adminLayout : userLayout}
        />
        <LoginRoute exact path='/login' component={Minimal} />
      </Switch>
    </Context.Provider>
  );
};

export default Routes;
