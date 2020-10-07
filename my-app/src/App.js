import React, { useState } from 'react';
import './App.css';
import theme from './theme/themeProvider';
import darkTheme from './themeDark/themeProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  const [darkState, setDarkState] = useState(false);
  const chosenTheme = darkState ? darkTheme : theme;

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={chosenTheme}>
      <CssBaseline />

      <Router>
        <Routes darkState={darkState} handleThemeChange={handleThemeChange} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
