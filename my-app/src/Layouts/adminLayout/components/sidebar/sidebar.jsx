import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Divider, Drawer } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'
import Profile from './profile/profile'
import SidebarNav from './sideBarNav/sideBarNav'
import Context from '../../../../context/Context'
import WeekendIcon from '@material-ui/icons/Weekend'
import ListAltIcon from '@material-ui/icons/ListAlt'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import CodeIcon from '@material-ui/icons/Code'
import InputIcon from '@material-ui/icons/Input'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}))

const Sidebar = (props) => {
  const { open, variant, onClose, ...rest } = props

  const classes = useStyles()

  const context = useContext(Context)

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'BI System',
      href: '/system',
      icon: <CodeIcon />
    },
    {
      title: 'DB User Actions',
      href: '/actions',
      icon: <ListAltIcon />
    },
    {
      title: 'The Lounge',
      href: '/lounge',
      icon: <WeekendIcon />
    },
    {
      title: 'Server Statistics',
      href: '/stats',
      icon: <EqualizerIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    },
    {
      title: 'Log Out',
      href: '/login',
      icon: <InputIcon />
    }
  ]

  return (
    <Drawer
      anchor='left'
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={classes.root}>
        <Profile profile={context.userInput} />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  )
}

export default Sidebar
