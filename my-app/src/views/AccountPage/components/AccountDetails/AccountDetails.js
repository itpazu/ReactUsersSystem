import React, { useState } from 'react'
import clsx from 'clsx'
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

const useStyles = makeStyles(() => ({
  root: {}
}))

const AccountDetails = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  console.log(props.profile)

  const [values, setValues] = useState({
    firstName: props.profile.first_name.charAt(0).toUpperCase() + props.profile.first_name.slice(1),
    lastName: props.profile.last_name.charAt(0).toUpperCase() + props.profile.last_name.slice(1),
    email: props.profile.email
  })

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete='off'
        noValidate
      >
        <CardHeader
          title='Profile'
          titleTypographyProps={{ variant: 'h2' }}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label='First name'
                margin='dense'
                name='firstName'
                onChange={handleChange}
                required
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label='Last name'
                margin='dense'
                name='lastName'
                onChange={handleChange}
                required
                value={values.lastName}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label='Email Address'
                margin='dense'
                name='email'
                onChange={handleChange}
                required
                value={values.email}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant='contained'
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AccountDetails
