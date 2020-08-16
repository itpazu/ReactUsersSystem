import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { allUsers } from '../../lib/api';
import Context from '../../context/Context';
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
  const { handleLogOut, refreshCredentials, currentlyLoggedUser } = context;
  const [userCredentials, setUserCredentials] = useState({
    ...currentlyLoggedUser,
  });
  const [errorFetchUsers, setErrorFetchUsers] = useState(null);
  const [newUsersList, setNewUsersList] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorFindUsers, setErrorFindUsers] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
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
          blocked: el.blocked || null,
        }))
      );
    } catch (error) {
      if (error.response.status === '401') {
        handleLogOut();
      } else if (error.response.status === '403') {
        await refreshCredentials(getAllUsers);
      } else {
        setErrorFetchUsers(true);
      }
    }
  };

  const handleUpdate = () => {
    getAllUsers();
  };

  const updateDeleteUser = (deleteUserName, deleteUserId) => {
    setDeleteThisUser({ name: deleteUserName, id: deleteUserId });
    updateDeleteButton(deleteUserName, deleteUserId);
  };

  const updateDeleteButton = (deleteUserName, deleteUserId) => {
    if (deleteUserName && deleteUserId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const search = (nameKey, myArray) => {
    const newName = nameKey.toLowerCase();
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name.toLowerCase() === newName) {
        setNewUsersList([myArray[i]]);
      }
    }
  };

  const relevantSearches = (nameKey, myArray) => {
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
  };

  const getSingleUser = () => {
    search(selectedName, allUsersList);
  };

  const getRelevantUsers = () => {
    relevantSearches(selectedName, allUsersList);
  };

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
          setDisabled={setDisabled}
          errorFetchUser={() => setErrorFetchUsers(true)}
        />
        <div className={classes.content}>
          <UsersTable
            users={newUsersList}
            handleDeleteUser={updateDeleteUser}
            handleUpdate={handleUpdate}
          />
        </div>
        {errorFetchUsers && (
          <div>
            <Alert severity='error'>Failed to load users</Alert>
          </div>
        )}
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
