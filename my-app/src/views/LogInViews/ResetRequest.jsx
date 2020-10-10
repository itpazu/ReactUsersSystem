import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { solicitNewPassword } from './../../lib/api';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
    email: true,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '-webkit-fill-available',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/hogwartsMain.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(16),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  suggestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  alert: {
    height: '100px',
    fontSize: '20px',
    alignItems: 'center',
  },
  alertBeforeLaunch: {
    display: 'none',
  },
}));

const ResetRequest = () => {
  const classes = useStyles();
  const [response, setResponse] = useState({
    activateAlert: null,
    success: null,
    message: '',
    redirect: null,
  });
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setResponse((prevState) => ({
      ...prevState,
      activateAlert: false,
    }));
    setResponse((prevState) => ({ ...prevState, PassChangeErrorAlert: false }));
    setFormState({
      isValid: true,
      values: {},
      touched: {},
      errors: {},
    });

    try {
      const submitRequest = await solicitNewPassword({
        email: formState.values.email,
      });
      setResponse({
        activateAlert: true,
        success: true,
        message: submitRequest.data.message,
      });
      setTimeout(() => {
        setResponse({ redirect: true });
      }, 3000);
    } catch (error) {
      setResponse({
        activateAlert: true,
        success: false,
        message:
          error.response !== undefined
            ? JSON.stringify(error.response.data.message)
            : 'server failure',
      });
    }
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote} />
        </Grid>

        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.contentBody}>
            <form className={classes.form} onSubmit={handleSignIn}>
              <Typography className={classes.title} variant='h2'>
                Password Reset
              </Typography>
              <Typography className={classes.title} variant='h5'>
                Insert your email address:
              </Typography>
              <TextField
                className={classes.textField}
                error={hasError('email')}
                fullWidth
                helperText={
                  hasError('email') ? formState.errors.email[0] : null
                }
                label='Email Address'
                name='email'
                onChange={handleChange}
                type='text'
                value={formState.values.email || ''}
                variant='outlined'
              />

              <Button
                className={classes.signInButton}
                color='primary'
                disabled={!formState.isValid}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Submit request
              </Button>
              {response.activateAlert && (
                <Alert severity={response.success ? 'success' : 'error'}>
                  {response.message}
                </Alert>
              )}
            </form>
            {response.redirect && <Redirect to='/login' />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(ResetRequest);
