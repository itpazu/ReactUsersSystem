import React from 'react';
import TextField from '@material-ui/core/TextField';

function EmailField(props) {
  return (
    <TextField
      type='Email'
      required
      className={props.classNameEmailField}
      label={props.lableEmailField}
      variant='outlined'
      name={props.nameField}
      onChange={props.handleInputChange}
      autoComplete='on'
      value={props.userInputEmail}
    />
  );
}

export default EmailField;
