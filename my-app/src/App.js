import React, { useState } from 'react';
import './App.css';
import { theme } from './lib/themeProvider';
import { getName } from './lib/api';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({}));

const App = () => {
  const [hide, setHide] = useState(true);
  const [value, setValue] = useState('');

  const handleOnClick = async () => {
    const response = await getName();
    console.log(response);
    if (hide === true) {
      const response = await getName();
      console.log(response);
      setValue(response.data.username);
      setHide(false);
    } else {
      setValue('');
      setHide(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={handleOnClick}>Click here to show the name!</Button>
      <div className={hide === true ? 'hide' : ''}>Welcome {value}!</div>
    </ThemeProvider>
  );
};

export default App;
