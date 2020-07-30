import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { allUsers } from '../../lib/api';
import Context from '../../context/Context';
import cookie from 'js-cookie';
import Alert from '@material-ui/lab/Alert';

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
  const { LogOut } = context;
  const userId = cookie.get('_id');
  const csrf = cookie.get('csrf_token');
  const [errorFetchUsers, setErrorFetchUsers] = useState(null);
  useEffect(() => {
    getAllUsers(userId, csrf);
  }, []);

  const newUsersList = allUsersList.map((el) => ({
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
  }));

  function updateDeleteUser(deleteUserName, deleteUserId) {
    setDeleteThisUser({ name: deleteUserName, id: deleteUserId });
  }

  async function getAllUsers() {
    try {
      const response = await allUsers(userId, csrf);
      setAllUsersList(response.data.users);
    } catch (error) {
      if (error.response.status == '402') {
        console.log('error 402');
        LogOut();
      } else {
        setErrorFetchUsers(true);
      }
    }
  }

  function handleUpdate() {
    getAllUsers();
  }

  return (
    <div className={classes.root}>
      <UsersToolbar
        deleteUserValues={deleteThisUser}
        onUpdate={() => handleUpdate()}
      />
      <div className={classes.content}>
        <UsersTable users={newUsersList} handleDeleteUser={updateDeleteUser} />
      </div>
      {errorFetchUsers && (
        <div>
          <Alert type='error'> Failed to load users</Alert>
        </div>
      )}
    </div>
  );
};

export default UserList;
