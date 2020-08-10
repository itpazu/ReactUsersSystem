import React, { useState } from 'react'
import './App.css'
import theme from './theme/themeProvider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from '@material-ui/core/colors'

const App = () => {
  const [darkState, setDarkState] = useState(false)
  const palletType = darkState ? 'dark' : 'light'
  const backgroundType = darkState ? theme.palette.black : theme.palette.white
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500]
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500]
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
      topBar: mainPrimaryColor
    }
  })
  const chosenTheme = darkState ? darkTheme : theme

  const handleThemeChange = () => {
    setDarkState(!darkState)
  }

  return (
    <ThemeProvider theme={chosenTheme}>
      <Router>
        <Routes darkState={darkState} backgroundType={backgroundType} handleThemeChange={handleThemeChange} />
      </Router>
    </ThemeProvider>
  )
}

export default App
