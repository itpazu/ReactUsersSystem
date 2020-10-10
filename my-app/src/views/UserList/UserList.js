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
  const context = useContext(Context);
  const { makeApiRequest } = context;

  const [allUsersList, setAllUsersList] = useState([]);
  const [deleteThisUser, setDeleteThisUser] = useState({ name: '', id: '' });
  const [errorFetchUsers, setErrorFetchUsers] = useState({
    activateAlert: null,
    message: '',
  });
  const [firsNameList, setfirsNameList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [errorFindUsers, setErrorFindUsers] = useState(false);
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    await makeApiRequest(
      allUsers,
      null,
      updateList,
      getAllUsers,
      setErrorFetchUsers
    );
  };
  const updateUserList = () => {
    const currentList = allUsersList;
    if (searchResult) {
      const updatedList = currentList.filter((item) => {
        return item.first_name
          .toLowerCase()
          .includes(searchResult.toLocaleLowerCase());
      });
      setAllUsersList(updatedList);
    } else {
    }
  };

  const updateList = (data) => {
    const list = data;
    const newList = list.map((item) => item.first_name);
    setAllUsersList(list);
    setfirsNameList(newList);
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

  return (
    <>
      <div className={classes.root}>
        <UsersToolbar
          deleteUserValues={deleteThisUser}
          allUsers={firsNameList}
          handleUpdate={handleUpdate}
          setSelectedName={setSearchResult}
          getRelevantUsers={updateUserList}
          disableButton={disabled}
          setDisabled={setDisabled}
          setErrorFetchUser={setErrorFetchUsers}
        />
        <div className={classes.content}>
          <UsersTable
            users={allUsersList}
            handleDeleteUser={updateDeleteUser}
            handleUpdate={handleUpdate}
          />
        </div>
        {errorFetchUsers.activateAlert && (
          <div>
            <Alert severity='error'>{errorFetchUsers.message}</Alert>
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
