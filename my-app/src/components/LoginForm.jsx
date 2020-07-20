import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SimpleReactValidator from 'simple-react-validator';
import Alert from '@material-ui/lab/Alert';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import { makeStyles } from '@material-ui/core/styles';
import { LogIn, authenticateUser, Logout } from '../lib/api';
import cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(20),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '20%',
    marginBottom: theme.spacing(2),
    height: '25px',
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '40%',
  },
  checkboxes: {
    display: 'block',
    marginTop: '0px',
    textAlign: 'left',
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  linkReset: {
    marginTop: theme.spacing(2),
    textAlign: 'left',
    paddingLeft: '0px',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const validator = useRef(new SimpleReactValidator());
  const [userInput, setUserInput] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmittedForm = async (e) => {
    e.preventDefault();
    // console.log(userInput);
    const response = await LogIn(userInput);
    console.log(response);
    const userId = response.data.user_id;
    const csrfToken = response.headers.authorization;
    cookie.set('user_id', userId);
    cookie.set('csrf_token', csrfToken);
  };
  const handleFetch = async () => {
    const userId = cookie.get('user_id');
    const csrf = cookie.get('csrf_token');
    const getToken = await authenticateUser({ user_id: userId }, csrf);
    console.log(getToken);
  };

  const handlelogout = () => {
    cookie.remove('csrf_token');
  };

  return (
    <>
      <Container className={classes.header} component='main' maxWidth='xs'>
        <Typography component='h1' variant='h5' className={classes.title}>
          Sign In
        </Typography>
        <form autoComplete='off' onSubmit={handleSubmittedForm}>
          <EmailField
            classNameEmailField={classes.textField}
            lableEmailField={'Email'}
            handleInputChange={handleInputChange}
            userInputEmail={userInput.email}
            nameField={'email'}
            onBlur={validator.current.showMessageFor('Email')}
          />
          {validator.current.message('Email', userInput.email, 'email', {
            element: (message) => <Alert severity='error'>{message}</Alert>,
          })}
          <PasswordField
            userInputPassword={userInput.password}
            classNamePasswordField={classes.textField}
            nameField={'password'}
            labelPasswordField={'password'}
            handleInputChange={handleInputChange}
          />
          <Button type='submit' className={classes.submit}>
            Sign In
          </Button>
        </form>
        <Button type='click' className={classes.submit} onClick={handleFetch}>
          validate
        </Button>
        <Button type='click' className={classes.submit} onClick={handlelogout}>
          logout
        </Button>
      </Container>
    </>
  );
};

export default LoginForm;
