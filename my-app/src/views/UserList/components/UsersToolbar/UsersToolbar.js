import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { register, deleteUser } from '../../../../lib/api';
import cookie from 'js-cookie';
import SearchInput from '../../../../components/SearchInput/SearchInput';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const UsersToolbar = (props) => {
  const { className, ...rest } = props;
  const [modalStyle] = useState(getModalStyle);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [studentToAdd, setStudentToAdd] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    user_id: '',
  });
  const [authenticationInfo, setAuthenticationInfo] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const userId = cookie.get('user_id');
    const csrf = cookie.get('csrf_token');
    // local server only:
    // const JwtToken = cookie.get('jwt_token');
    //
    setAuthenticationInfo({
      csrf_token: csrf,
      //localServerOnly:
      // Jwt_token: JwtToken,
    });

    setStudentToAdd((prevState) => ({
      ...prevState,
      user_id: userId,
    }));
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOnInputChange = (event) => {
    const { value, name } = event.target;
    setStudentToAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUserSubmit = (event) => {
    event.preventDefault();

    register(studentToAdd, authenticationInfo)
      .then((res) => {
        console.log(res);
        handleCloseAdd();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleDeleteIdChange = (event) => {
    setDeleteId(event.target.id);
  };

  const handleDeleteUserSubmit = (event) => {
    event.preventDefault();
    deleteUser(deleteId)
      .then((res) => {
        console.log(res);
        handleCloseDelete();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(studentToAdd);
  const addBody = (
    <div
      style={modalStyle}
      className={classes.paper}
      onSubmit={handleAddUserSubmit}
    >
      <h2 id='simple-modal-title'>Add a new user:</h2>
      <form className={classes.root} autoComplete='off'>
        <TextField
          required
          id='standard-basic'
          type='text'
          label='Last Name'
          value={studentToAdd.last_name}
          onChange={handleOnInputChange}
          name='last_name'
        />
        <TextField
          required
          id='standard-basic'
          type='text'
          label='First Name'
          value={studentToAdd.first_name}
          onChange={handleOnInputChange}
          name='first_name'
        />
        <TextField
          required
          id='standard-basic'
          type='email'
          label='Email'
          value={studentToAdd.email}
          onChange={handleOnInputChange}
          name='email'
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='role'>Role</InputLabel>
          <Select
            required
            native
            value={studentToAdd.role}
            onChange={handleOnInputChange}
            inputProps={{
              name: 'role',
              id: 'age-native-simple',
            }}
          >
            <option aria-label='None' value='' />
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </Select>
        </FormControl>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );

  const deleteBody = (
    <div
      style={modalStyle}
      className={classes.paper}
      onSubmit={handleDeleteUserSubmit}
    >
      <h2 id='simple-modal-title'>Delete a user:</h2>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='standard-basic'
          type='number'
          label='ID'
          value={deleteId}
          onChange={handleDeleteIdChange}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button className={classes.importButton}>Import</Button>
          <Button className={classes.exportButton}>Export</Button>
          <Button color='secondary' onClick={handleOpenAdd} variant='contained'>
            Add user
          </Button>
          <Button
            color='primary'
            onClick={handleOpenDelete}
            variant='contained'
          >
            Delete user
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder='Search user'
          />
        </div>
      </div>
      <div>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {addBody}
        </Modal>
      </div>
      <div>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {deleteBody}
        </Modal>
      </div>
    </>
  );
};

export default UsersToolbar;
