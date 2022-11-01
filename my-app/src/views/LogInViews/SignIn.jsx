import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, withRouter, useLocation, useHistory } from 'react-router-dom';
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
import { register } from '../../lib/api';


const SignInSchema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
  first_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2,
    },
}
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  grid: {
    height: '100%',
    justifyContent: 'space-between'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
      },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    overflow: 'auto',
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
}));

const ALERT_DEFAULT = {
  activateAlert: null,
  success: null,
  message: null,
}
const SignIn = () => {
  const {handleSubmittedForm, makeApiRequest} = useContext(Context);
  const classes = useStyles();
  const {pathname} = useLocation();
  let history = useHistory()
  const [response, setResponse] = useState(ALERT_DEFAULT);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    setResponse(ALERT_DEFAULT)
    let schema = pathname === '/login' ? (({first_name, last_name, ...schema})=>schema)(SignInSchema) : (({password, ...schema})=>schema)(SignInSchema)
    const errors = validate(formState.values, schema);

    let mounted = true;

    if (mounted) {
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {},
      }));
    }
    return function cleanup() {
      mounted = false;
    };
  }, [formState.values, pathname]);
  const [togglePasswordView, setTogglePasswordView] = useState(true);

  const toggleShowPassword = () => {
    setTogglePasswordView(!togglePasswordView);
  };

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setResponse({ activateAlert: false });
    setFormState({
      isValid: true,
      values: {},
      touched: {},
      errors: {},
    });
    try {
      await handleSubmittedForm(
        formState.values.email,
        formState.values.password
      );
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
  const updateAddResponse = (data) => {
    setResponse({
      activateAlert: true,
      message: data.message,
      success: true,
    });
    setTimeout(() => {
      history.push('/login')
    }, 2500);
  };
  const addUserToDb = async () => {
    await makeApiRequest(
      register,
      formState.values,
      updateAddResponse,
      addUserToDb,
      setResponse
    );
  };
  const handleAddUserSubmit = async (event) => {
    event.preventDefault();
    setResponse({
      activateAlert: false,
      message: '',
      success: false,
    });
    addUserToDb();
  };
  const hasError = (field) => 
    formState.touched[field] && formState.errors[field] ? true : false;
  

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={4}>
          <div className={classes.quote} />
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.contentBody}>
            <form className={classes.form} onSubmit={pathname === '/login' ? 
            handleSignIn : handleAddUserSubmit }>
              <Typography className={classes.title} variant='h2'>
                {pathname === '/login' ? 'Sign in' : 'Sign Up'}
              </Typography>
              <TextField
                className={classes.textField}
                error={hasError('email')}
                fullWidth
                helperText={
                  hasError('email') ? formState.errors.email[0] : null
                }
                label='Email address'
                name='email'
                onChange={handleChange}
                type='text'
                value={formState.values.email || ''}
                variant='outlined'
              />
              {pathname === '/login' ? 
              
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
              /> :
              <>
              <TextField
                className={classes.textField}
                error={hasError('first_name')}
                fullWidth
                helperText={
                  hasError('first_name') ? formState.errors.first_name[0] : null
                }
                label='Name'
                name='first_name'
                onChange={handleChange}
                type='text'
                value={formState.values.first_name || ''}
                variant='outlined'
              />
              <TextField
                className={classes.textField}
                error={hasError('last_name')}
                fullWidth
                helperText={
                  hasError('last_name') ? formState.errors.last_name[0] : null
                }
                label='Last Name'
                name='last_name'
                onChange={handleChange}
                type='text'
                value={formState.values.last_name || ''}
                variant='outlined'
              />
              </> 
            }
              <Button
                className={classes.signInButton}
                disabled={!formState.isValid}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                {pathname === '/login' ? 'Sign in now' : 'Sign Up Now'}
              </Button>
              <Typography color='textSecondary' variant='body1'>
                Forgot your password? {'   '}{' '}
                <RouterLink to='/reset_pass' variant='h6'>
                  Reset password
                </RouterLink>
              </Typography>
              <Typography color='textSecondary' variant='body1'>
                {pathname === '/login' ? 'New User? '  : 'Back to   ' }
                <RouterLink to={pathname === '/login' ? '/sign-up' : '/login'} variant='h6'>
                  {pathname === '/login'? 'Sign Up' : 'Login'}
                </RouterLink>
              </Typography>
              {response.activateAlert && (
                <Alert
                  className={classes.signInButton}
                  severity={response.success ? 'success' : 'error'}
                >
                  {response.message && response.message}
                </Alert>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(SignIn);
