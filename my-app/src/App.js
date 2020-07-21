import React, { useState } from 'react';
import './App.css';
import { theme } from './theme/themeProvider';
import { getName } from './lib/api';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginForm from './components/LoginForm';
import LogIn from './views/LogIn';
import Main from './Layouts/main/main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MinimalLayout from './Layouts/minimal/Minimal';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        {/* <LoginForm /> */}

        {/* <Main /> */}
        <MinimalLayout>
          <LogIn />
        </MinimalLayout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
