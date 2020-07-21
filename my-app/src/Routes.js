import React, { useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Main from './Layouts/main/main';
import LogIn from './views/LogIn';
import cookie from 'js-cookie';
import { authenticateUser } from './lib/api';
import Minimal from './Layouts/minimal/Minimal';

const Routes = () => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [token, setToken] = useState(null);

  const handleSubmittedForm = async (e) => {
    e.preventDefault();
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
    setToken(getToken);
  };

  const handleLogout = () => {
    cookie.remove('csrf_token');
    setToken(null);
  };

  return (
    <Switch>
      <Route exact path='/'>
        {/* <LoginForm handleSubmittedForm={handleSubmittedForm} setUserInput={setUserInput} userInput={userInput} /> */}
        <Main token={token} handleLogout={handleLogout} />
      </Route>
      <Route exact path='/login'>
        <Minimal>
          <LogIn />
        </Minimal>
      </Route>
    </Switch>
  );
};

export default Routes;
