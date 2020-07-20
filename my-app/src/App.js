import React, { useState } from 'react';
import './App.css';
import { theme } from './theme/themeProvider';
import { getName } from './lib/api';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginForm from './components/LoginForm';
import NavBar from './Layouts/main/Navbar.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LoginForm />
        <NavBar />
      </ThemeProvider>
    </Router>
  );
};

export default App;
