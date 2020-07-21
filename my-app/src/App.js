import React from 'react';
import './App.css';
import { theme } from './theme/themeProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Router>
  )
}

export default App
