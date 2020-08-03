import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { UsersToolbar, UsersTable } from './components'
import { allUsers } from '../../lib/api'
import Context from '../../context/Context'
import cookie from 'js-cookie'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
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
  const [allUsersList, setAllUsersList] = useState([])
  const [deleteThisUser, setDeleteThisUser] = useState({ name: '', id: '' })
  const [selectedName, setSelectedName] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [errorFindUsers, setErrorFindUsers] = useState(false)

  const context = useContext(Context)
  const { LogOut } = context
  const userId = cookie.get('_id')
  const csrf = cookie.get('csrf_token')
  const [errorFetchUsers, setErrorFetchUsers] = useState(false)
  useEffect(() => {
    getAllUsers(userId, csrf)
  }, [])

  async function getAllUsers () {
    try {
      const response = await allUsers(userId, csrf)
      setNewUsersList(response.data.users.map((el, index) =>
        ({
          id: el._id,
          name: el.first_name.charAt(0).toUpperCase() + el.first_name.slice(1) + ' ' + el.last_name.charAt(0).toUpperCase() + el.last_name.slice(1),
          email: el.email,
          role: el.role,
          createdAt: el.creation_time,
          count: index
        })
      ))
      setAllUsersList(response.data.users.map((el, index) =>
        ({
          id: el._id,
          name: el.first_name.charAt(0).toUpperCase() + el.first_name.slice(1) + ' ' + el.last_name.charAt(0).toUpperCase() + el.last_name.slice(1),
          email: el.email,
          role: el.role,
          createdAt: el.creation_time,
          count: index
        })
      ))
    } catch (error) {
      if (error.response.status == '402') {
        console.log('error 402')
        LogOut()
      } else {
        setErrorFetchUsers(true)
        setTimeout(() => {
          setErrorFetchUsers(false)
        }, 5000)
      }
    }
  }

  function updateDeleteUser (deleteUserName, deleteUserId) {
    setDeleteThisUser({ name: deleteUserName, id: deleteUserId })
    updateDeleteButton(deleteUserName, deleteUserId)
  }

  function updateDeleteButton (deleteUserName, deleteUserId) {
    if (deleteUserName !== '' && deleteUserName !== undefined && deleteUserName !== null && deleteUserId !== '' && deleteUserId !== undefined && deleteUserId !== null) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  function handleUpdate () {
    getAllUsers()
  }

  function search (nameKey, myArray) {
    const newName = nameKey.toLowerCase()
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name.toLowerCase() === newName) {
        setNewUsersList([myArray[i]])
      }
    }
  }

  function relevantSearches (nameKey, myArray) {
    const newName = nameKey.toLowerCase()
    const newArr = []
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name.toLowerCase().includes(newName)) {
        newArr.push(myArray[i])
      }
    }
    if (newArr.length < 1) {
      setErrorFindUsers(true)
      setTimeout(() => {
        setErrorFindUsers(false)
      }, 3000)
    } else {
      setNewUsersList(newArr)
    }
  }

  function getSingleUser () {
    search(selectedName, allUsersList)
  }

  function getRelevantUsers () {
    relevantSearches(selectedName, allUsersList)
  }

  return (
    <div className={classes.root}>
      <UsersToolbar deleteUserValues={deleteThisUser} onUpdate={() => handleUpdate()} users={newUsersList} allUsers={allUsersList} selectedName={selectedName} getSingleUser={getSingleUser} handleUpdate={handleUpdate} setSelectedName={setSelectedName} getRelevantUsers={getRelevantUsers} disableButton={disabled} />
      <div className={classes.content}>
        <UsersTable users={newUsersList} handleDeleteUser={updateDeleteUser} />
      </div>
      {errorFetchUsers && (
        <div>
          <Alert severity='error'>Failed to load users</Alert>
        </div>
      )}
      {errorFindUsers && (
        <div>
          <Alert severity='error'>Failed to find any matching users</Alert>
        </div>
      )}
    </div>
  )
}

export default UserList
