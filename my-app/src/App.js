import React, { useState } from 'react'
import './App.css'
import theme from './theme/themeProvider'
import darkTheme from './themeDark/themeProvider'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

const App = () => {
  const [darkState, setDarkState] = useState(false)
  const backgroundType = darkState ? theme.palette.black : theme.palette.white
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
