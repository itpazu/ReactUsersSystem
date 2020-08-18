import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core'
import { submitUserEditDetails } from '../../../../lib/api'
import Alert from '@material-ui/lab/Alert'
import Context from '../../../../context/Context'

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2
    },
    format: {
      pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      message: 'must not contain any numerical digits or special characters'
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2
    },
    format: {
      pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      message: 'must not contain any numerical digits or special characters'
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'required field' },
    email: true,
    length: {
      maximum: 64
    }
  }
}

const useStyles = makeStyles((theme) => ({
  root: {},
  alertMessage: {
    marginTop: theme.spacing(2)
  }
}))

const AccountDetails = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  const context = useContext(Context)
  const {
    updateProfileInfo,
    handleLogOut,
    refreshCredentials,
    currentlyLoggedUser
  } = context

  const [response, setResponse] = useState({
    activateAlert: null,
    success: null,
    message: ''
  })

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstName:
        props.profile.first_name.charAt(0).toUpperCase() +
        props.profile.first_name.slice(1),
      lastName:
        props.profile.last_name.charAt(0).toUpperCase() +
        props.profile.last_name.slice(1),
      email: props.profile.email
    },
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema)

    let mounted = true

    if (mounted) {
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }))
    }
    return function cleanup () {
      mounted = false
    }
  }, [formState.values])

  const handleChange = (event) => {
    event.persist()

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value.toLowerCase()
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }))
  }

  const handleEditedDetailsSubmit = (event) => {
    event.preventDefault()
    setResponse((prevState) => ({ ...prevState }))
    setFormState({
      isValid: true,
      values: {
        firstName:
          formState.values.firstName.charAt(0).toUpperCase() +
          formState.values.firstName.slice(1),
        lastName:
          formState.values.lastName.charAt(0).toUpperCase() +
          formState.values.lastName.slice(1),
        email: formState.values.email
      },
      touched: {},
      errors: {}
    })

    callEditProfile()
  }
  const callEditProfile = async () => {
    try {
      const submitDetailsChange = await submitUserEditDetails(
        {
          first_name: formState.values.firstName.toLowerCase(),
          last_name: formState.values.lastName.toLowerCase(),
          email: formState.values.email.toLowerCase(),
          _id: props.profile._id
        },
        currentlyLoggedUser
      )
      setResponse({
        activateAlert: true,
        success: true,
        message: submitDetailsChange.data
      })
      updateProfileInfo({ _id: props.profile._id })
    } catch (err) {
      const error = err.response ? err.response.status : 405
      if (error === 401) {
        handleLogOut()
      } else if (error === 403) {
        await refreshCredentials(callEditProfile)
      } else {
        setResponse({
          activateAlert: true,
          success: false,
          message:
            error.response !== undefined
              ? JSON.stringify(error.response.data)
              : 'server failed'
        })
      }
    }
  }

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete='off' noValidate>
        <CardHeader title='Profile' titleTypographyProps={{ variant: 'h2' }} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={hasError('firstName')}
                helperText={
                  hasError('firstName') ? formState.errors.firstName[0] : null
                }
                label='First name'
                margin='dense'
                name='firstName'
                onChange={handleChange}
                required
                value={formState.values.firstName || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={hasError('lastName')}
                helperText={
                  hasError('lastName') ? formState.errors.lastName[0] : null
                }
                label='Last name'
                margin='dense'
                name='lastName'
                onChange={handleChange}
                required
                value={formState.values.lastName || ''}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={hasError('email')}
                helperText={
                  hasError('email') ? formState.errors.email[0] : null
                }
                label='Email Address'
                margin='dense'
                name='email'
                onChange={handleChange}
                required
                value={formState.values.email || ''}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={handleEditedDetailsSubmit}
          >
            Save details
          </Button>
          {response.activateAlert && (
            <Alert
              className={classes.alertMessage}
              severity={response.success ? 'success' : 'error'}
            >
              {response.message}
            </Alert>
          )}
        </CardActions>
      </form>
    </Card>
  )
}

export default AccountDetails
