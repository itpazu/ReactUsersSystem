import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    height: '60px'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}))

const NavBar = (props) => {
  const { className, onSidebarOpen, handleLogout, token, ...rest } = props

  const classes = useStyles()

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {token ?
          <Link to="/">
            <img alt='logo' src='/images/logos/keepers_child_safety_2nd_icon.png' height="50" width="50" />
          </Link>
          : <Link to='/'>Home</Link>}
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton className={classes.signOutButton} color='inherit'>
            <InputIcon onClick={handleLogout} />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
