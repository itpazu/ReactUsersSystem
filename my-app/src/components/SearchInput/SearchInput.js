import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Paper, TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    width: '100%',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}))

const SearchInput = props => {
  const { className, onChange, style, users, allUsers, selectedName, setSelectedName, getSingleUser, handleUpdate, getRelevantUsers, ...rest } = props

  const classes = useStyles()

  const handleSearchNameChange = (event, value) => {
    event.preventDefault()
    if (typeof value === 'object' && value !== null) {
      setSelectedName(value.name)
    } else if (value === '') {
      handleUpdate()
    } else {
      setSelectedName(event.target.value)
    }
  }

  const handleSearchNameClick = () => {
    if (selectedName !== '' && selectedName !== undefined && selectedName !== null && allUsers.filter(event => event.name.toLowerCase() === selectedName).length > 0) {
      getSingleUser()
    } else if (selectedName === '') {
      handleUpdate()
    } else if (selectedName !== '' && selectedName !== undefined && selectedName !== null && allUsers.filter(event => event.name.toLowerCase().includes(selectedName).length > 0)) {
      getRelevantUsers()
    }
  }

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Autocomplete
        freeSolo
        options={allUsers}
        className={classes.input}
        id='free-solo-2-demo'
        getOptionLabel={(option) => option.name}
        onChange={handleSearchNameChange}
        onInputChange={handleSearchNameChange}
        renderInput={(params) => (
          <TextField
            {...params}
            margin='normal'
            variant='outlined'
          />
        )}
      />
      <Button onClick={handleSearchNameClick} color='primary' variant='contained'>Search</Button>
    </Paper>
  )
}

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
}

export default SearchInput
