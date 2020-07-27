import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { register, deleteUser } from '../../../../lib/api'
import cookie from 'js-cookie'
import SearchInput from '../../../../components/SearchInput/SearchInput'
import Alert from '@material-ui/lab/Alert'
import validate from 'validate.js'

function rand () {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle () {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    marginBottom: theme.spacing(2)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  TopButtons: {
    marginRight: theme.spacing(1)
  },
  inputFields: {
    marginBottom: theme.spacing(1)
  },
  submitButton: {
    marginTop: theme.spacing(2)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const schema = {
  first_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2
    }
  },
  last_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 16,
      minimum: 2
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'required field' },
    email: true,
    length: {
      maximum: 64
    }
  }
}

const UsersToolbar = (props) => {
  const { className, ...rest } = props
  const [modalStyle] = useState(getModalStyle)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [authenticationInfo, setAuthenticationInfo] = useState('')
  const [AddUserResponse, setAddUserResponse] = useState({
    activateAlert: false,
    message: ''
  })

  const classes = useStyles()
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const adminId = cookie.get('user_id')
    const adminCsrf = cookie.get('csrf_token')
    // local server only:
    // const JwtToken = cookie.get('jwt_token')

    setAuthenticationInfo({
      csrf_token: adminCsrf,
      user_id: adminId
      // localServerOnly:
      // Jwt_token: JwtToken
    })
  }, [])

  useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState((prevState) => ({
      ...prevState,

      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }

  const handleCloseAddUser = () => {
    setOpenAdd(false)
    cleanFormFields()
    setAddUserResponse({
      activateAlert: false,
      message: '',
      success: false
    })
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleOnAddUserInputChange = (event) => {
    event.persist()
    const { value, name } = event.target

    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [name]: value },
      touched: {
        ...formState.touched,
        [name]: true
      }
    }))
  }

  const handleAddUserSubmit = (event) => {
    event.preventDefault()

    setAddUserResponse({
      activateAlert: false,
      message: '',
      success: false
    })
    register(formState.values, authenticationInfo)
      .then((res) => {
        console.log(res)
        setAddUserResponse({
          activateAlert: true,
          message: res.data.message,
          success: true
        })
        setTimeout(() => {
          handleCloseAddUser()
        }, 2500)
      })
      .catch((err) => {
        console.log(err.response.data)
        setAddUserResponse({
          activateAlert: true,
          message: JSON.stringify(err.response.data),
          success: false
        })
        cleanFormFields()
      })
  }

  const handleDeleteIdChange = (event) => {
    setDeleteId(event.target.id)
  }

  const cleanFormFields = () => {
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    })
  }
  const handleDeleteUserSubmit = (event) => {
    event.preventDefault()
    deleteUser(deleteId)
      .then((res) => {
        console.log(res)
        handleCloseDelete()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false

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
            value={formState.values.role}
            onChange={handleOnAddUserInputChange}
            inputProps={{
              name: 'role',
              id: 'age-native-simple'
            }}
          >
            <option aria-label='None' value='' />
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
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
  )

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
  )

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button className={classes.TopButtons}>Import</Button>
          <Button className={classes.TopButtons}>Export</Button>
          <Button
            className={classes.TopButtons}
            color='secondary'
            onClick={handleOpenAdd}
            variant='contained'
          >
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
  )
}

export default UsersToolbar
