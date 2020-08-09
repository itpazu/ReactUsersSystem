import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'
import Context from '../../../../context/Context'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    height: '64px',
    backgroundColor: theme.palette.topBar,
    margin: 0
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}))

const TopBar = (props) => {
  const context = useContext(Context)
  const classes = useStyles()
  const { onSidebarOpen, darkState, onHandleThemeChange } = props

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link to='/'>
          <img
            alt='logo'
            src='/images/logos/keepers_child_safety_2nd_icon.png'
            height='50'
            width='50'
          />
        </Link>
        <Switch checked={darkState} onChange={onHandleThemeChange} />
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            color='inherit'
            onClick={context.handleLogOut}
          >
            <InputIcon />
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

export default TopBar
