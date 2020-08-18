import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import adminLayout from './Layouts/adminLayout/adminLayout';
import userLayout from './Layouts/userLayout/userLayout';
import developerLayout from './Layouts/developerLayout/developerLayout';
import productManagerLayout from './Layouts/productManagerLayout/productManagerLayout';
import marketingLayout from './Layouts/marketingLayout/marketingLayout';
import cookie from 'js-cookie';
import { LogIn, refreshToken, getUserInfoRefresh } from './lib/api';
import Minimal from './Layouts/minimal/Minimal';
import Context from './context/Context';
import { PrivateRoute, LoginRoute } from './privateRoutes/PrivateRoute';
import ResetPassword from './views/LogInViews/ResetPassword';
import Dashboard, { ChangeStatus } from './views/Dashboard/Dashboard';

const Routes = (props) => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentlyLoggedUser, setCurrentlyLoggedUser] = useState({
    userId: '',
    csrf: '',
  });

  const { backgroundType, handleThemeChange, darkState } = props;

  useEffect(() => {
    const userId = cookie.get('_id');
    const csrfToken = cookie.get('csrf_token');
    setCurrentlyLoggedUser({ userId: userId, csrf: csrfToken });
  }, [userInput]);

  const handleSubmittedForm = async (mail, pass) => {
    const user = { email: mail.toLowerCase(), password: pass };
    setUserInput(user);
    try {
      const response = await LogIn(user);
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

  const updateProfileInfo = async () => {
    try {
      const response = await getUserInfoRefresh(currentlyLoggedUser);
      setUserInput(response.data);
    } catch (err) {
      const error = err.response ? err.response.status : 405;
      if (error === 401) {
        handleLogOut();
      } else if (error === 403) {
        await refreshCredentials(() =>
          updateProfileInfo(currentlyLoggedUser.userId)
        );
      } else {
      }
    }
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
        backgroundType,
        handleSubmittedForm,
        currentlyLoggedUser,
        isAuthenticated,
        handleLogOut,
        userInput,
        handleThemeChange,
        darkState,
        refreshCredentials,
        updateProfileInfo,
      }}
    >
      <Switch>
        {/* <Route exact path='/dave' component={Dashboard} />  dev only*/}
        <PrivateRoute
          exact
          path='/'
          component={
            userInput.role === 'admin'
              ? adminLayout
              : userInput.role === 'developer'
              ? developerLayout
              : userInput.role === 'product manager'
              ? productManagerLayout
              : userInput.role === 'marketing'
              ? marketingLayout
              : userLayout
          }
        />
        <LoginRoute exact path='/login' component={Minimal} />
        <LoginRoute path='/change_pass' component={ResetPassword} />
      </Switch>
    </Context.Provider>
  );
};

export default Routes;
