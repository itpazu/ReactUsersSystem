import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  RadioGroup,
  Button,
} from '@material-ui/core';
import Context from '../../../../context/Context';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getInitials } from '../../../../helpers';
import DialogUnblock from './dialogUnblock';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
  hover: {
    '&$hover': {
      '&:hover': {
        backgroundColor: theme.palette.warning.light,
      },
    },
  },
}));

const UsersTable = (props) => {
  const {
    className,
    users,
    handleDeleteUser,
    handleUpdate,
    userAvatar,
    ...rest
  } = props;
  const classes = useStyles();
  const context = useContext(Context);
  const { currentlyLoggedUser } = context;
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [OpenUnblockedUser, setOpenUnblocked] = useState(false);
  const [userToUnblock, setUserToUnblock] = useState({
    blockedUserId: '',
    userName: '',
  });
  const handleRadioChange = (event) => {
    if (
      event.target.value === selectedUserId &&
      event.target.name === selectedUserName
    ) {
      setSelectedUserId('');
      setSelectedUserName('');
      handleDeleteUser('', '');
    } else {
      setSelectedUserId(event.target.value);
      setSelectedUserName(event.target.name);
      handleDeleteUser(event.target.name, event.target.value);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleOpenUnblock = (id, name, email) => {
    setOpenUnblocked(true);
    setUserToUnblock({
      blockedUserId: id,
      userName: name,
      emailAddress: email,
    });
  };

  const handleCloseUnblock = () => {
    setOpenUnblocked(false);
  };

  const updateAllUsers = () => {
    handleUpdate();
  };

  return (
    <>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <RadioGroup value={selectedUserId} name={selectedUserName}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Registration date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(0, rowsPerPage).map((user, index) => (
                      <TableRow
                        classes={
                          user.blocked
                            ? { hover: classes.hover }
                            : { hover: classes.root }
                        }
                        hover
                        key={user._id}
                        selected={selectedUserId.indexOf(user._id) !== -1}
                      >
                        <TableCell padding='checkbox'>
                          <Radio
                            color='primary'
                            value={user._id}
                            name={user.first_name}
                            id={`radioButton${user.index}`}
                            onClick={handleRadioChange}
                            disabled={
                              user._id === currentlyLoggedUser.userId
                                ? true
                                : false
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Avatar
                              className={classes.avatar}
                              src={userAvatar[`${user._id}`]}
                            >
                              {getInitials(
                                user.first_name + ' ' + user.last_name
                              )}
                            </Avatar>
                            <Typography
                              variant='body1'
                              className={classes.capitalize}
                            >
                              {user.first_name + ' ' + user.last_name}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.creation_time}</TableCell>
                        <TableCell>
                          {user.blocked && (
                            <Button
                              variant='contained'
                              type='submit'
                              onClick={() => {
                                handleOpenUnblock(
                                  user._id,
                                  user.first_name,
                                  user.email
                                );
                              }}
                            >
                              {' '}
                              Unblock
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </RadioGroup>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component='div'
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <DialogUnblock
        OpenDialog={OpenUnblockedUser}
        closeUnblock={handleCloseUnblock}
        userDetails={userToUnblock}
        getAllUsers={updateAllUsers}
      />
    </>
  );
};

export default UsersTable;
