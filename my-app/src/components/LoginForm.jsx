import React, { useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SimpleReactValidator from 'simple-react-validator'
import Alert from '@material-ui/lab/Alert'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(20),
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '20%',
    marginBottom: theme.spacing(2),
    height: '25px'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '40%'
  },
  checkboxes: {
    display: 'block',
    marginTop: '0px',
    textAlign: 'left'
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  linkReset: {
    marginTop: theme.spacing(2),
    textAlign: 'left',
    paddingLeft: '0px'
  }
}))

const LoginForm = (props) => {
  const classes = useStyles()
  const validator = useRef(new SimpleReactValidator())

  const { handleSubmittedForm, setUserInput, userInput } = props

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInput((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <Container className={classes.header} component='main' maxWidth='xs'>
        <Typography component='h1' variant='h5' className={classes.title}>
          Sign In
        </Typography>
        <form autoComplete='off' onSubmit={handleSubmittedForm}>
          <EmailField
            classNameEmailField={classes.textField}
            labelEmailField={'Email'}
            handleInputChange={handleInputChange}
            userInputEmail={userInput.email}
            nameField={'email'}
            onBlur={validator.current.showMessageFor('Email')}
          />
          {validator.current.message('Email', userInput.email, 'email', {
            element: (message) => <Alert severity='error'>{message}</Alert>
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
      </Container>
    </>
  )
}

export default LoginForm
