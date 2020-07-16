import React, { useState } from 'react';
import './App.css';
import { theme } from './lib/themeProvider';
import { getName } from './lib/api';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginForm />
    </ThemeProvider>
  );
};

export default App;
