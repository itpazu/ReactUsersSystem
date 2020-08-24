import React, { useState, useEffect, useContext } from 'react'
import validate from 'validate.js'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  IconButton
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import Alert from '@material-ui/lab/Alert'
import { changePassword } from '../../../../lib/api'
import Context from '../../../../context/Context'

const schema = {
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    equality: 'password'
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,255}$/,
      message:
        'must be 10-25 characters long, and must contain at least one uppercase letter, one lowercase letter, and one numerical value'
    }
  }
}

const useStyles = makeStyles(() => ({
  root: {}
}))

const Password = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  const context = useContext(Context)

  const [togglePasswordView, setTogglePasswordView] = useState(true)
  const [response, setResponse] = useState({
    activateAlert: true,
    success: null,
    message: '',
    PassChangeErrorAlert: null
  })
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })
  const [toggleAlertVisibility, setToggleAlertVisibility] = useState(null)

  useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  const toggleShowPassword = () => {
    setTogglePasswordView(!togglePasswordView)
  }

  const handleChange = (event) => {
    const { name, value, checked } = event.target
    event.persist()

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: event.target.type === 'checkbox' ? checked : value
      },
      touched: {
        ...formState.touched,
        [name]: true
      }
    }))
  }

  const handleSignIn = async (event) => {
    event.preventDefault()
    setResponse((prevState) => ({ ...prevState, PassChangeErrorAlert: false }))
    setFormState({
      isValid: true,
      values: {},
      touched: {},
      errors: {}
    })

    try {
      const submitPassChange = await changePassword({
        password: formState.values.confirmPassword,
        confirm_password: formState.values.password,
        _id: context.userInput._id
      })
      setToggleAlertVisibility(true)
      setResponse({
        activateAlert: false,
        success: true,
        message: submitPassChange.data
      })
      setTimeout(() => {
        setResponse({ activateAlert: true })
      }, 3000)
    } catch (error) {
      setResponse({
        activateAlert: true,
        success: false,
        message: JSON.stringify(error.response.data),
        PassChangeErrorAlert: true
      })
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSignIn}>
        {response.activateAlert ? (
          <>
            <CardHeader
              subheader='Update password'
              title='Password'
            />
            <Divider />
            <CardContent>
              <TextField
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
                        ) : (<VisibilityOff />)}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
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
                        ) : (<VisibilityOff />)}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                className={classes.signInButton}
                disabled={!formState.isValid}
                fullWidth
                size='large'
                type='submit'
              >
                Update password
              </Button>
              {response.PassChangeErrorAlert && (
                <Alert severity='error'>{response.message}</Alert>
              )}
            </CardActions>
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
    </Card>
  )
}

export default Password
