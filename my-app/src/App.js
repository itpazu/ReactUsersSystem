import React, { useState } from 'react';
import './App.css';
import { getName } from './lib/api';

const App = () => {
  const [hide, setHide] = useState(true);
  const [value, setValue] = useState('');

  const handleOnClick = async () => {
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
    <>
      <button onClick={handleOnClick}>Click here to show the name!</button>
      <div className={hide === true ? 'hide' : ''}>Welcome {value}!</div>
    </>
  );
};

export default App;
