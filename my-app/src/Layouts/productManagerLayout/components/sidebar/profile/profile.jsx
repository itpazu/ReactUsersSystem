import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}))

const Profile = (props) => {
  const { ...rest } = props
  const classes = useStyles()

  const userName = props.profile.first_name.charAt(0).toUpperCase() + props.profile.first_name.slice(1) + ' ' + props.profile.last_name.charAt(0).toUpperCase() + props.profile.last_name.slice(1)

  const user = {
    name: userName,
    avatar: props.profile.photo === '' ? '/images/empty-avatar.png' : props.profile.photo
  }

  return (
    <div {...rest} className={classes.root}>
      <Avatar
        alt='Person'
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to='/settings'
      />
      <Typography className={classes.name} variant='h4'>
        {user.name}
      </Typography>
      <Typography variant='body2'>{user.bio}</Typography>
    </div>
  )
}

export default Profile
