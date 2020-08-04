import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { allUsers, refreshToken } from '../../lib/api';
import Context from '../../context/Context';
import cookie from 'js-cookie';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [allUsersList, setAllUsersList] = useState([]);
  const [deleteThisUser, setDeleteThisUser] = useState({ name: '', id: '' });
  const context = useContext(Context);
  const { handleLogOut } = context;
  const IdFromCookie = cookie.get('_id');
  const csrfFromCookie = cookie.get('csrf_token');
  const [userCredentials, setUserCredentials] = useState({
    userId: IdFromCookie,
    csrf: csrfFromCookie,
  });
  // const [errorFetchUsers, setErrorFetchUsers] = useState(null)
  const [newUsersList, setNewUsersList] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorFindUsers, setErrorFindUsers] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const { userId, csrf } = userCredentials;
      const response = await allUsers(userId, csrf);
      setAllUsersList(
        response.data.users.map((el, index) => ({
          id: el._id,
          name:
            el.first_name.charAt(0).toUpperCase() +
            el.first_name.slice(1) +
            ' ' +
            el.last_name.charAt(0).toUpperCase() +
            el.last_name.slice(1),
          email: el.email,
          role: el.role,
          createdAt: el.creation_time,
          count: index,
        }))
      );
      setNewUsersList(
        response.data.users.map((el, index) => ({
          id: el._id,
          name:
            el.first_name.charAt(0).toUpperCase() +
            el.first_name.slice(1) +
            ' ' +
            el.last_name.charAt(0).toUpperCase() +
            el.last_name.slice(1),
          email: el.email,
          role: el.role,
          createdAt: el.creation_time,
          count: index,
        }))
      );
    } catch (error) {
      if (error.response.status == '401') {
        handleLogOut();
      } else if (error.response.status == '403') {
        await refreshCredentials();
      } else {
        setErrorFetchUsers(true);
      }
    }
  }
  const refreshCredentials = async () => {
    try {
      await refreshToken(userCredentials.userId);
      getAllUsers();
    } catch (error) {
      handleLogOut();
    }
  };

  function handleUpdate() {
    getAllUsers();
  }

  function updateDeleteUser(deleteUserName, deleteUserId) {
    setDeleteThisUser({ name: deleteUserName, id: deleteUserId });
    updateDeleteButton(deleteUserName, deleteUserId);
  }

  function updateDeleteButton(deleteUserName, deleteUserId) {
    if (
      deleteUserName !== '' &&
      deleteUserName !== undefined &&
      deleteUserName !== null &&
      deleteUserId !== '' &&
      deleteUserId !== undefined &&
      deleteUserId !== null
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function search(nameKey, myArray) {
    const newName = nameKey.toLowerCase();
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name.toLowerCase() === newName) {
        setNewUsersList([myArray[i]]);
      }
    }
  }

  function relevantSearches(nameKey, myArray) {
    const newName = nameKey.toLowerCase();
    const newArr = [];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name.toLowerCase().includes(newName)) {
        newArr.push(myArray[i]);
      }
    }
    if (newArr.length < 1) {
      setErrorFindUsers(true);
    } else {
      setNewUsersList(newArr);
      setErrorFindUsers(false);
    }
  }

  function getSingleUser() {
    search(selectedName, allUsersList);
  }

  function getRelevantUsers() {
    relevantSearches(selectedName, allUsersList);
  }

  return (
    <>
      <div className={classes.root}>
        <UsersToolbar
          deleteUserValues={deleteThisUser}
          users={newUsersList}
          allUsers={allUsersList}
          selectedName={selectedName}
          getSingleUser={getSingleUser}
          handleUpdate={handleUpdate}
          setSelectedName={setSelectedName}
          getRelevantUsers={getRelevantUsers}
          disableButton={disabled}
          errorFetchUser={() => setErrorFetchUsers(true)}
        />
        <div className={classes.content}>
          <UsersTable
            users={newUsersList}
            handleDeleteUser={updateDeleteUser}
            loggedUser={userCredentials.userId}
          />
        </div>
        {/* {errorFetchUsers && (
          <div>
            <Alert severity='error'>Failed to load users</Alert>
          </div>
        )} */}
        {errorFindUsers && (
          <div>
            <Collapse in={errorFindUsers}>
              <Alert
                severity='error'
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setErrorFindUsers(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
              >
                Failed to find any matching users!
              </Alert>
            </Collapse>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
