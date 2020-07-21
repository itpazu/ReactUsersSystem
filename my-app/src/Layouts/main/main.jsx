import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import TopBar from './components/TopBar/TopBar';
import Sidebar from './components/sidebar/sidebar';

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

  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })

  const [openSidebar, setOpenSidebar] = useState(false)

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  const shouldOpenSidebar = isDesktop ? true : openSidebar

  return (
    <div
      className={{
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      }}
    >
      <TopBar onSidebarOpen={handleSidebarOpen} token={token} handleLogout={handleLogout} />
      {token &&
        <>
          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
          />
          <main className={classes.content}>{children}</main>
        </>}
    </div>
  )
}

export default Main