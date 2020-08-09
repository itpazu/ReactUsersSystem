import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { register, deleteUser, refreshToken } from '../../../../lib/api';
import cookie from 'js-cookie';
import SearchInput from '../../../../components/SearchInput/SearchInput';
import Alert from '@material-ui/lab/Alert';
import validate from 'validate.js';
import Context from '../../../../context/Context';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    marginBottom: theme.spacing(2),
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  TopButtons: {
    marginRight: theme.spacing(1),
  },
  inputFields: {
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(2),
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

const schema = {
  first_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'required field' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  role: {
    presence: { allowEmpty: false, message: 'required field' },
  },
};

const UsersToolbar = (props) => {
  const context = useContext(Context);
  const { handleLogOut } = context;
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const {
    className,
    deleteUserValues,
    errorFetchUser,
    users,
    allUsers,
    selectedName,
    setSelectedName,
    getSingleUser,
    getRelevantUsers,
    handleUpdate,
    disableButton,
    ...rest
  } = props;
  const [modalStyle] = useState(getModalStyle);
  const adminId = cookie.get('_id');
  const adminCsrf = cookie.get('csrf_token');
  const [authenticationInfo, setAuthenticationInfo] = useState({
    csrf_token: adminCsrf,
    _id: adminId,
  });
  const [AddUserResponse, setAddUserResponse] = useState({
    activateAlert: false,
    message: '',
  });

  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    setAuthenticationInfo({
      csrf_token: adminCsrf,
      _id: adminId,
    });
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevState) => ({
      ...prevState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAddUser = () => {
    handleUpdate();
    setOpenAdd(false);
    cleanFormFields();

    setAddUserResponse({
      activateAlert: false,
      message: '',
      success: false,
    });
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOnAddUserInputChange = (event) => {
    event.persist();
    const { value, name } = event.target;

    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [name]: value.toLowerCase() },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    }));
  };

  const handleAddUserSubmit = async (event) => {
    event.preventDefault();
    setAddUserResponse({
      activateAlert: false,
      message: '',
      success: false,
    });
    addUserToDb();
  };

  const addUserToDb = async () => {
    try {
      const newUser = await register(formState.values, authenticationInfo);
      setAddUserResponse({
        activateAlert: true,
        message: newUser.data.message,
        success: true,
      });
      setTimeout(() => {
        handleCloseAddUser();
      }, 2500);
    } catch (err) {
      const error = err.response.status;
      if (error == '401') {
        setAddUserResponse({
          activateAlert: true,
          message: JSON.stringify(err.response.data),
          success: false,
        });
        setTimeout(() => {
          handleLogOut();
        }, 3500);
      } else if (error == '403') {
        await refreshCredentials();
        addUserToDb();
      } else {
        setAddUserResponse({
          activateAlert: true,
          message: JSON.stringify(err.response.data),
          success: false,
        });
        cleanFormFields();
      }
    }
  };

  const refreshCredentials = async () => {
    try {
      const { _id } = authenticationInfo;
      await refreshToken(_id);
      // addUserToDb();
    } catch (error) {
      handleLogOut();
    }
  };

  const cleanFormFields = () => {
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    });
  };
  const handleDeleteUserSubmit = (event) => {
    event.preventDefault();
    handleDeleteUser();
  };

  const handleDeleteUser = async () => {
    deleteUser(deleteUserValues.id, authenticationInfo)
      .then(() => {
        handleCloseDelete();
        handleUpdate();
      })
      .catch((err) => {
        const error = err.response.status;
        if (error == '401') {
          setTimeout(() => {
            handleLogOut();
          }, 2500);
        } else if (error == '403') {
          refreshCredentials();
          handleDeleteUser();
        } else {
          errorFetchUser();
        }
      });
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const addUserBody = (
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
          value={formState.values.last_name || ''}
          onChange={handleOnAddUserInputChange}
          name='last_name'
          className={classes.inputFields}
          error={hasError('last_name')}
          helperText={
            hasError('last_name') ? formState.errors.last_name[0] : null
          }
        />
        <TextField
          required
          id='standard-basic'
          type='text'
          label='First Name'
          value={formState.values.first_name || ''}
          onChange={handleOnAddUserInputChange}
          name='first_name'
          className={classes.inputFields}
          error={hasError('first_name')}
          helperText={
            hasError('first_name') ? formState.errors.first_name[0] : null
          }
        />
        <TextField
          required
          id='standard-basic'
          type='email'
          label='Email'
          value={formState.values.email || ''}
          onChange={handleOnAddUserInputChange}
          name='email'
          className={classes.inputFields}
          error={hasError('email')}
          helperText={hasError('email') ? formState.errors.email[0] : null}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='role'>Role</InputLabel>
          <Select
            required
            className={classes.inputFields}
            native
            value={formState.values.role || ''}
            onChange={handleOnAddUserInputChange}
            error={hasError('role')}
            name='role'
            inputProps={{
              name: 'role',
              id: 'age-native-simple',
            }}
          >
            <option aria-label='None' value='' />
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
            <option value='developer'>Developer</option>
            <option value='product manager'>Product Manager</option>
          </Select>
        </FormControl>
        <Button
          type='submit'
          disabled={!formState.isValid}
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>

      {AddUserResponse.activateAlert && (
        <Alert
          className={classes.submitButton}
          severity={AddUserResponse.success ? 'success' : 'error'}
        >
          {AddUserResponse.message}
        </Alert>
      )}
    </div>
  );

  const deleteBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>
        Delete {deleteUserValues.name} with ID {deleteUserValues.id}
      </h2>
      <Button onClick={(event) => handleDeleteUserSubmit(event)} type='submit'>
        Submit
      </Button>
    </div>
  );

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button className={classes.TopButtons}>Import</Button>
          <Button className={classes.TopButtons}>Export</Button>
          <Button
            className={classes.TopButtons}
            onClick={handleOpenAdd}
            variant='contained'
          >
            Add user
          </Button>
          <Button
            onClick={handleOpenDelete}
            variant='contained'
            disabled={disableButton}
          >
            Delete user
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder='Search user'
            users={users}
            allUsers={allUsers}
            selectedName={selectedName}
            getSingleUser={getSingleUser}
            handleUpdate={handleUpdate}
            setSelectedName={setSelectedName}
            getRelevantUsers={getRelevantUsers}
          />
        </div>
      </div>
      <div>
        <Modal
          open={openAdd}
          onClose={handleCloseAddUser}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {addUserBody}
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
