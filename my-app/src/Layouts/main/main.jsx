import React, { useState, useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'
import TopBar from './components/TopBar/TopBar'
import Sidebar from './components/sidebar/sidebar'
import Context from '../../context/Context'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}))

const Main = (props) => {
  const { children, token, handleLogout } = props
  const context = useContext(Context)
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  const shouldOpenSidebar = isDesktop ? true : openSidebar
  console.log(context.isAuthenticated)
  return (
    <>
      {context.isAuthenticated && (
        <div
          className={{
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
          }}
        >
          <TopBar
            onSidebarOpen={handleSidebarOpen}
            handleLogout={handleLogout}
          />

          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
          />
          <main className={classes.content}>{children}</main>
        </div>
      )}
    </>
  )
}

export default Main
