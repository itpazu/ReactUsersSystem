import React, { useState, useEffect, Children } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Layouts/main/main';
import cookie from 'js-cookie';
import { authenticateUser, LogIn } from './lib/api';
import Minimal from './Layouts/minimal/Minimal';
import Context from './context/Context';
import { PrivateRoute, LoginRoute } from './privateRoutes/PrivateRoute';

const Routes = (props) => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Role = 'user';

  useEffect(() => {}, []);

  const handleSubmittedForm = async (mail, pass) => {
    const userInput = { email: mail, password: pass };
    setUserInput(userInput);
    const response = await LogIn(userInput);
    const userId = response.data.user_id;
    const csrfToken = response.headers.authorization;
    cookie.set('user_id', userId);
    cookie.set('csrf_token', csrfToken);
    handleFetch();
  };

  const handleFetch = async () => {
    const userId = cookie.get('user_id');
    const csrf = cookie.get('csrf_token');
    const getToken = await authenticateUser({ user_id: userId }, csrf);
    setIsAuthenticated(true);
  };

  const LogOut = () => {
    setIsAuthenticated(false);
    cookie.remove('csrf_token');
  };
  return (
    <Context.Provider value={{ handleSubmittedForm, isAuthenticated, LogOut }}>
      <Switch>
        <PrivateRoute
          exact
          path='/'
          // component={Role === 'admin' ? Main : }
          component={Main}
          auth={isAuthenticated}
        />
        <LoginRoute exact path='/login' component={Minimal} />
      </Switch>
    </Context.Provider>
  );
};

export default Routes;
