import React from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';

const NoPaddingAutocomplete = withStyles({
  inputRoot: {
    marginTop: '7px',
    '&&[class*="MuiOutlinedInput-root"] $input': {
      padding: 1,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
  },
  input: {
    marginRight: '5px',
    height: 'inherit',
  },
})(Autocomplete);

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    height: '50px',
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    width: '100%',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    height: 'inherit',
    margin: 0,
    marginRight: '10px',
  },
  textField: {
    marginRight: '5px',
    height: 'inherit',
  },
}));

const SearchInput = (props) => {
  const {
    className,
    onChange,
    users,
    allUsers,
    selectedName,
    setSelectedName,
    getSingleUser,
    handleUpdate,
    getRelevantUsers,

    ...rest
  } = props;

  const classes = useStyles();

  const handleSearchNameChange = (event, value) => {
    event.preventDefault();
    console.log('inside first condition');
    console.log('event', event);
    console.log('value', value);

    if (typeof value === 'object' && value !== null) {
      //input is an object
      setSelectedName(value.name);
      console.log('inside second condition');
      console.log('event', event.target.value);
      console.log('value', value);
    } else if (value === '') {
      //input is empty string
      handleUpdate();
    } else {
      // input is string
      setSelectedName(event.target.value);
    }
  };

  const handleSearchNameClick = () => {
    if (
      selectedName &&
      allUsers.filter((event) => event.name.toLowerCase() === selectedName)
        .length > 0
    ) {
      getSingleUser();
    } else if (selectedName === '') {
      handleUpdate();
    } else if (
      selectedName &&
      allUsers.filter(
        (event) => event.name.toLowerCase().includes(selectedName).length > 0
      )
    ) {
      getRelevantUsers();
    }
  };

  return (
    <Paper className={classes.root}>
      <SearchIcon className={classes.icon} />
      <NoPaddingAutocomplete
        freeSolo
        className={classes.input}
        options={allUsers}
        getOptionLabel={(option) => option.name}
        onChange={handleSearchNameChange}
        onInputChange={handleSearchNameChange}
        renderInput={(params) => <TextField {...params} variant='outlined' />}
      />
      <Button onClick={handleSearchNameClick} variant='contained'>
        Search
      </Button>
    </Paper>
  );
};

// SearchInput.propTypes = {
//   className: PropTypes.string,
//   onChange: PropTypes.func,
//   style: PropTypes.object,
// };

export default SearchInput;
