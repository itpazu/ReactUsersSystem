import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { UsersToolbar, UsersTable } from './components'
import { v1 as uuid } from 'uuid'
import { allUsers } from '../../lib/api'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const UserList = () => {
  const classes = useStyles()

  const [allUsersList, setAllUsersList] = useState([])

  const getAllUsers = async () => {
    const response = await allUsers()
    setAllUsersList(response.data.users)
  }

  useEffect(() => { getAllUsers() }, [])

  const newUsersList = allUsersList.map(el =>
    ({
      id: uuid(),
      name: el.first_name.charAt(0).toUpperCase() + el.first_name.slice(1) + ' ' + el.last_name.charAt(0).toUpperCase() + el.last_name.slice(1),
      email: el.email,
      role: el.role,
      createdAt: el.creation_time
    })
  )

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={newUsersList} />
      </div>
    </div>
  )
}

export default UserList
