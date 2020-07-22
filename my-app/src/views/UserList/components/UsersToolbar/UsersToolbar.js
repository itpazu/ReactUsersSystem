import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { register, deleteUser } from '../../../../lib/api'

import SearchInput from '../../../../components/SearchInput/SearchInput'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 400,
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

const UsersToolbar = props => {
  const { className, ...rest } = props

  const [modalStyle] = useState(getModalStyle)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)
  const [id, setId] = useState('')
  const [deleteId, setDeleteId] = useState('')


  const classes = useStyles()

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleIdChange = (event) => {
    setId(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleAdminChange = (event) => {
    setAdmin(event.target.value)
  }

  const handleAddUserSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      id: id,
      admin: admin
    }
    register(newUser).then(res => {
      console.log(res)
      handleCloseAdd()
    }).catch(err => {
      console.log(err)
    })
  }

  const handleDeleteIdChange = (event) => {
    setDeleteId(event.target.id)
  }

  const handleDeleteUserSubmit = (event) => {
    event.preventDefault()
    deleteUser(deleteId).then(res => {
      console.log(res)
      handleCloseDelete()
    }).catch(err => {
      console.log(err)
    })
  }

  const addBody = (
    <div
      style={modalStyle}
      className={classes.paper}
      onSubmit={handleAddUserSubmit}
    >
      <h2 id="simple-modal-title">Add a new user:</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          type="text"
          label="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <TextField
          id="standard-basic"
          type="text"
          label="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <TextField
          id="standard-basic"
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="standard-basic"
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          id="standard-basic"
          type="number"
          label="ID"
          value={id}
          onChange={handleIdChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Admin?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={admin}
            onChange={handleAdminChange}
          >
            <MenuItem value="false">No</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )

  const deleteBody = (
    <div
      style={modalStyle}
      className={classes.paper}
      onSubmit={handleDeleteUserSubmit}
    >
      <h2 id="simple-modal-title">Delete a user:</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          type="number"
          label="ID"
          value={deleteId}
          onChange={handleDeleteIdChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )

  return (
    <>
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button className={classes.importButton}>Import</Button>
          <Button className={classes.exportButton}>Export</Button>
          <Button
            color="secondary"
            onClick={handleOpenAdd}
            variant="contained"
          >
            Add user
          </Button>
          <Button
            color="primary"
            onClick={handleOpenDelete}
            variant="contained"
          >
            Delete user
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
          />
        </div>
      </div>
      <div>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {addBody}
        </Modal>
      </div>
      <div>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {deleteBody}
        </Modal>
      </div>
    </>
  )
}

export default UsersToolbar
