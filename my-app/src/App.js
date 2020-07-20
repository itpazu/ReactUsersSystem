import React, { useState } from 'react';
import './App.css';
import { theme } from './theme/themeProvider';
import { getName } from './lib/api';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginForm from './components/LoginForm';
import Main from './Layouts/main/main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LoginForm />
        <Main />
      </ThemeProvider>
    </Router>
  );
};

export default App;
