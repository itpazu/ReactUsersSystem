import React, { useState, useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import Main from './Layouts/main/main'
import SignIn from './views/SignIn'
import cookie from 'js-cookie'
import { authenticateUser, LogIn } from './lib/api'
import Minimal from './Layouts/minimal/Minimal'
import Context from './context/Context'
import UserList from './views/UserList/UserList'
import RouteWithLayout from './components/RouteWithLayout'

const Routes = () => {
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const handleSubmittedForm = async (mail, pass) => {
    const userInput = { email: mail, password: pass }
    setUserInput(userInput)
    const response = await LogIn(userInput)
    const userId = response.data.user_id
    const csrfToken = response.headers.authorization
    cookie.set('user_id', userId)
    cookie.set('csrf_token', csrfToken)
    handleFetch()
  }

  const handleFetch = async () => {
    const userId = cookie.get('user_id')
    const csrf = cookie.get('csrf_token')
    await authenticateUser({ user_id: userId }, csrf)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    cookie.remove('csrf_token')
    setIsAuthenticated(false)
  }

  return (
    <Switch>
      <Context.Provider value={{ handleSubmittedForm, isAuthenticated, handleLogout }}>
        {!isAuthenticated && <Redirect exact from="/" to="/login" />}
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/login'>
          <Minimal>
            <SignIn />
          </Minimal>
        </Route>
        <RouteWithLayout component={UserList} layout={Main} exact path="/users" />
      </Context.Provider>
    </Switch>
  )
}

export default Routes
