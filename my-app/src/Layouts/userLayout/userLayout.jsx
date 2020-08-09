import React, { useState, useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'
import TopBar from './components/TopBar/TopBar'
import Sidebar from './components/sidebar/sidebar'
import clsx from 'clsx'
import HomePage from '../../views/HomePage/HomePage'
import { BrowserRouter as Router } from 'react-router-dom'
import { PrivateRoute } from '../../privateRoutes/PrivateRoute'
import Context from '../../context/Context'
import { ThemeProvider } from '@material-ui/core/styles'

const Main = () => {
  const context = useContext(Context)
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 56,
      height: '-webkit-fill-available',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64
      }
    },
    shiftContent: {
      paddingLeft: 240
    },
    content: {
      backgroundColor: context.backgroundType,
      height: '100%'
    }
  }))
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
    <ThemeProvider theme={context.darkTheme}>
      <Router>
        <div
          className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
          })}
        >
          <TopBar onSidebarOpen={handleSidebarOpen} />

          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
          />
          <main className={classes.content}>
            <PrivateRoute exact path='/' component={HomePage} />
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default Main
