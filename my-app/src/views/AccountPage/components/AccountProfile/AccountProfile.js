import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}))

const AccountProfile = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  const userName = props.profile.first_name.charAt(0).toUpperCase() + props.profile.first_name.slice(1) + ' ' + props.profile.last_name.charAt(0).toUpperCase() + props.profile.last_name.slice(1)

  const user = {
    name: userName,
    avatar: props.profile.photo === '' ? '/images/empty-avatar.png' : props.profile.photo
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Box
          alignItems='center'
          display='flex'
          flexDirection='column'
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color='textPrimary'
            gutterBottom
            variant='h3'
          >
            {user.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          variant='text'
        >
          Upload picture
        </Button>
        <Button variant='text'>Remove picture</Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile
