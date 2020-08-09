import React, { forwardRef, useContext } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { List, ListItem, Button, colors } from '@material-ui/core'
import Context from '../../../../../context/Context'

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.button,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.button,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}))

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
))

const SidebarNav = (props) => {
  const { pages, ...rest } = props

  const classes = useStyles()
  const context = useContext(Context)

  return (
    <List {...rest} className={classes.root}>
      {pages.map((page) => (
        <>
          {page.title === 'Log Out' ?
            <ListItem className={classes.item} disableGutters key={page.title} onClick={context.handleLogOut}>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>
            : <ListItem className={classes.item} disableGutters key={page.title}>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>}
        </>
      ))}
    </List>
  )
}

export default SidebarNav
