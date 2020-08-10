import React, { useState } from 'react'
import './App.css'
import theme from './theme/themeProvider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import {
  orange,
  deepOrange
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
      topBar: orange[500]
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
