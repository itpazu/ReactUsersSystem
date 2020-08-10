import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import adminLayout from './Layouts/adminLayout/adminLayout';
import userLayout from './Layouts/userLayout/userLayout';
import cookie from 'js-cookie';
import { LogIn, refreshToken } from './lib/api';
import Minimal from './Layouts/minimal/Minimal';
import Context from './context/Context';
import { PrivateRoute, LoginRoute } from './privateRoutes/PrivateRoute';
import ResetPassword from './views/ResetPassword/ResetPassword';

const Routes = () => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentlyLoggedUser, setCurrentlyLoggedUser] = useState({
    userId: '',
    csrf: '',
  });

  useEffect(() => {
    const userId = cookie.get('_id');
    const csrfToken = cookie.get('csrf_token');
    setCurrentlyLoggedUser({ userId: userId, csrf: csrfToken });
  }, [userInput]);
  const handleSubmittedForm = async (mail, pass) => {
    const userInput = { email: mail.toLowerCase(), password: pass };
    setUserInput(userInput);
    try {
      const response = await LogIn(userInput);
      setUserInput(response.data);
      const userId = response.data._id;
      const csrfToken = response.headers.authorization;
      cookie.set('_id', userId);
      cookie.set('csrf_token', csrfToken);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
    cookie.remove('csrf_token');
  };

  const refreshCredentials = async (callback) => {
    try {
      await refreshToken(currentlyLoggedUser.userId);
      return callback();
    } catch (error) {
      handleLogOut();
    }
  };

  return (
    <Context.Provider
      value={{
        handleSubmittedForm,
        isAuthenticated,
        handleLogOut,
        userInput,
        refreshCredentials,
        currentlyLoggedUser,
      }}
    >
      <Switch>
        <PrivateRoute
          exact
          path='/'
          component={userInput.role !== 'user' ? adminLayout : userLayout}
        />
        <LoginRoute exact path='/login' component={Minimal} />
        <LoginRoute path='/change_pass' component={ResetPassword} />
      </Switch>
    </Context.Provider>
  );
};

export default Routes;
