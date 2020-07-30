import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Paper, TextField } from '@material-ui/core'
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
  const { className, onChange, style, users, selectedName, setSelectedName, ...rest } = props

  const classes = useStyles()

  const handleSearchNameChange = (event) => {
    setSelectedName(event.target.value)
  }

  const handleSearchNameClick = () => {
    if (selectedName !== '' && selectedName !== undefined &&  !== null) {

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
        className={classes.input}
        id='free-solo-2-demo'
        disableClearable
        options={users.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            margin='normal'
            variant='outlined'
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </Paper>
  )
}

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
}

export default SearchInput
