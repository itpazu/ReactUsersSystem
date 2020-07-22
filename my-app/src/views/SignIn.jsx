import React, { useState, useEffect, useContext } from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import Context from '../context/Context'

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
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
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(16)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  suggestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}))

const SignIn = (props) => {
  const { history } = props
  const context = useContext(Context)
  const classes = useStyles()

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema)
    console.log(errors)

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])
  console.log(formState)
  const [togglePasswordView, setTogglePasswordView] = useState(true)

  const toggleShowPassword = () => {
    setTogglePasswordView(!togglePasswordView)
  }
  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };

  const handleChange = (event) => {
    event.persist()

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        //field name
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked //true/flase
            : event.target.value // value inserted
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }))
  }

  const handleSignIn = (event) => {
    event.preventDefault()
    console.log(formState.values.email)
    context.handleSubmittedForm(
      formState.values.email,
      formState.values.password
    )

    history.push('/')
  }

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false

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
                Sign in
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
                        // onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {togglePasswordView ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
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
                Sign in now
              </Button>
              <Typography color='textSecondary' variant='body1'>
                Forgot your password? {'   '}{' '}
                <Link component={RouterLink} to='/sign-up' variant='h6'>
                  Reset password
                </Link>
              </Typography>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(SignIn)
