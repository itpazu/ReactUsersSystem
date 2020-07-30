import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { UsersToolbar, UsersTable } from './components'
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

  const [newUsersList, setNewUsersList] = useState([])
  const [deleteThisUser, setDeleteThisUser] = useState({ name: '', id: '' })
  const [selectedName, setSelectedName] = useState('')

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getAllUsers()
    }
    return function cleanup () {
      mounted = false
    }
  }, [])

  function updateDeleteUser (deleteUserName, deleteUserId) {
    setDeleteThisUser({ name: deleteUserName, id: deleteUserId })
  }

  async function getAllUsers () {
    const response = await allUsers()
    setNewUsersList(response.data.users.map(el =>
      ({
        id: el._id,
        name: el.first_name.charAt(0).toUpperCase() + el.first_name.slice(1) + ' ' + el.last_name.charAt(0).toUpperCase() + el.last_name.slice(1),
        email: el.email,
        role: el.role,
        createdAt: el.creation_time
      })
    ))
  }

  function handleUpdate () {
    getAllUsers()
  }

  function search (nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i]
      }
    }
  }

  async function getSingleUser () {
    const singleSearch = await search(selectedName, newUsersList)
    setNewUsersList(singleSearch)
  }

  return (
    <div className={classes.root}>
      <UsersToolbar deleteUserValues={deleteThisUser} onUpdate={() => handleUpdate()} users={newUsersList} selectedName={selectedName} getSingleUser={getSingleUser} handleUpdate={handleUpdate} setSelectedName={setSelectedName} />
      <div className={classes.content}>
        <UsersTable users={newUsersList} handleDeleteUser={updateDeleteUser} />
      </div>
    </div>
  )
}

export default UserList
