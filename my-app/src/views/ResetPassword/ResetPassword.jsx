import React, { useState, useEffect, useContext } from 'react';
import {
  Link as RouterLink,
  withRouter,
  useLocation,
  Redirect,
} from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Context from '../../context/Context';
import Alert from '@material-ui/lab/Alert';
import { checkTokenForPasswordReset, changePassword } from './../../lib/api';

const schema = {
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    equality: 'password',
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 22,
      minimum: 8,
    },
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
    backgroundImage: 'url(/images/frame_2.png)',
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

const ResetPassword = () => {
  const params = new URLSearchParams(useLocation().search);
  const context = useContext(Context);
  const IdFromToken = params.get('id');
  const authToken = params.get('token');
  const classes = useStyles();
  const [togglePasswordView, setTogglePasswordView] = useState(true);
  const [response, setResponse] = useState({
    activateAlert: null,
    success: null,
    message: '',
    redirect: null,
    PassChangeErrorAlert: null,
  });
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [toggleAlertVisibility, setToggleAlertVisibility] = useState(null);

  useEffect(() => {
    if (IdFromToken && authToken) {
      checkTokenForPasswordReset(IdFromToken, authToken)
        .then(() => {
          setResponse((prevState) => ({
            ...prevState,

            activateAlert: true,
          }));
        })
        .catch((error) => {
          setToggleAlertVisibility(true);
          setResponse((prevState) => ({
            ...prevState,
            success: false,
            activateAlert: false,
            message: JSON.stringify(error.response.data),
          }));
        });
    } else {
      setResponse({ redirect: true });
    }
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const toggleShowPassword = () => {
    setTogglePasswordView(!togglePasswordView);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: event.target.type === 'checkbox' ? checked : value,
      },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setResponse((prevState) => ({ ...prevState, PassChangeErrorAlert: false }));
    setFormState({
      isValid: true,
      values: {},
      touched: {},
      errors: {},
    });

    try {
      const submitPassChange = await changePassword({
        password: formState.values.confirmPassword,
        confirm_password: formState.values.password,
        _id: IdFromToken,
      });
      setToggleAlertVisibility(true);
      setResponse({
        activateAlert: false,
        success: true,
        message: submitPassChange.data,
      });
      setTimeout(() => {
        setResponse({ redirect: true });
      }, 3000);
    } catch (error) {
      setResponse({
        activateAlert: true,
        success: false,
        message: JSON.stringify(error.response.data),
        PassChangeErrorAlert: true,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              {response.activateAlert ? (
                <>
                  <Typography className={classes.title} variant='h2'>
                    Set a new password
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={hasError('password')}
                    fullWidth
                    helperText={
                      hasError('password') ? formState.errors.password[0] : null
                    }
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    type={togglePasswordView ? 'password' : 'text'}
                    value={formState.values.password || ''}
                    variant='outlined'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={toggleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {togglePasswordView ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('confirmPassword')}
                    fullWidth
                    helperText={
                      hasError('confirmPassword')
                        ? formState.errors.confirmPassword[0]
                        : null
                    }
                    label='Confirm Password'
                    name='confirmPassword'
                    onChange={handleChange}
                    type={togglePasswordView ? 'password' : 'text'}
                    value={formState.values.confirmPassword || ''}
                    variant='outlined'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={toggleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {togglePasswordView ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    Change password
                  </Button>
                  {response.PassChangeErrorAlert && (
                    <Alert severity='error'>{response.message}</Alert>
                  )}
                </>
              ) : (
                <>
                  <Alert
                    className={
                      toggleAlertVisibility
                        ? classes.alert
                        : classes.alertBeforeLaunch
                    }
                    severity={response.success ? 'success' : 'error'}
                  >
                    {response.message}
                  </Alert>
                </>
              )}
            </form>
            {response.redirect && <Redirect to='/login' />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(ResetPassword);
