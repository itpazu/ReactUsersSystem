import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.info.light
  }
}))

const TopBar = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <AppBar {...rest} className={classes.root} position='fixed'>
      <Toolbar />
    </AppBar>
  )
}

export default TopBar
