import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Main from './Layouts/main/main';
import SignIn from './views/SignIn';
import cookie from 'js-cookie';
import { authenticateUser, LogIn } from './lib/api';
import Minimal from './Layouts/minimal/Minimal';
import Context from './context/Context';

const Routes = () => {
  //   const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookiesState, setCookiesState] = useState(false);

  //   useEffect(async () => {
  //     try {
  //       const userId = cookie.get('user_id');
  //       const csrf = cookie.get('csrf_token');
  //       const getToken = await authenticateUser({ user_id: userId }, csrf);
  //       setToken(getToken);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //       console.log(error)
  //     }
  //   }, [cookiesState]);

  const handleSubmittedForm = async (mail, pass) => {
    // setUserInput({email: mail, password: pass})
    const userInput = { email: mail, password: pass };
    const response = await LogIn(userInput);
    const userId = response.data.user_id;
    const csrfToken = response.headers.authorization;
    cookie.set('user_id', userId);
    cookie.set('csrf_token', csrfToken);
    handleFetch();
    setCookiesState(true);
  };
  console.log(token);
  const handleFetch = async () => {
    const userId = cookie.get('user_id');
    const csrf = cookie.get('csrf_token');
    const getToken = await authenticateUser({ user_id: userId }, csrf);
    setToken(true);
  };

  return (
    <Switch>
      <Context.Provider value={{ handleSubmittedForm }}>
        <Route exact path='/'>
          {/* <LoginForm handleSubmittedForm={handleSubmittedForm} setUserInput={setUserInput} userInput={userInput} /> */}
          <Main token={token} />
          {/* <div>hello world</div> */}
        </Route>
        <Route exact path='/login'>
          <Minimal>
            <SignIn />
          </Minimal>
        </Route>
      </Context.Provider>
    </Switch>
  );
};

export default Routes;
