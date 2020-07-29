import React from 'react';
import './App.css';
import { theme } from './theme/themeProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
