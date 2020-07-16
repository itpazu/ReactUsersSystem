import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

function PasswordField(props) {
  const [togglePasswordView, setTogglePasswordView] = useState(true);

  const toggleShowPassword = () => {
    setTogglePasswordView(!togglePasswordView);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      required
      value={props.userInputEmail}
      className={props.classNamePasswordField}
      label={props.labelPasswordField}
      type={togglePasswordView ? 'password' : 'text'}
      variant='outlined'
      onChange={props.handleInputChange}
      name={props.nameField}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={toggleShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {togglePasswordView ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;
