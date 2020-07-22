import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}))

const TopBar = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <AppBar {...rest} className={classes.root} color='primary' position='fixed'>
      <Toolbar />
    </AppBar>
  )
}

export default TopBar
