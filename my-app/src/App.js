import React, { useState } from 'react'
import './App.css'
import theme from './theme/themeProvider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import {
  orange,
  deepOrange,
  blueGrey
} from '@material-ui/core/colors'

const App = () => {
  const [darkState, setDarkState] = useState(false)
  const backgroundType = darkState ? theme.palette.black : theme.palette.white

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: orange[500]
      },
      secondary: {
        main: deepOrange[900]
      },
      text: {
        primary: blueGrey[50],
        secondary: blueGrey[50]
      },
      topBar: orange[500]
    },
    typography: {
      h2: {
        color: theme.palette.white,
        fontWeight: 500,
        fontSize: '29px',
        letterSpacing: '-0.24px',
        lineHeight: '32px'
      },
      h4: {
        fontWeight: 500,
        fontSize: '20px',
        letterSpacing: '-0.06px',
        lineHeight: '24px'
      },
      h6: {
        fontWeight: 500,
        fontSize: '14px',
        letterSpacing: '-0.05px',
        lineHeight: '20px'
      },
      body1: {
        fontSize: '14px',
        letterSpacing: '-0.05px',
        lineHeight: '21px'
      }
    }
  })
  const chosenTheme = darkState ? darkTheme : theme

  const handleThemeChange = () => {
    setDarkState(!darkState)
  }

  return (
    <ThemeProvider theme={chosenTheme}>
      <Router>
        <Routes
          darkState={darkState}
          backgroundType={backgroundType}
          handleThemeChange={handleThemeChange}
        />
      </Router>
    </ThemeProvider>
  )
}

export default App
