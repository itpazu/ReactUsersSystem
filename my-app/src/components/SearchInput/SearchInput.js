import React from 'react';
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
  const { allUsers, setSelectedName, handleUpdate, getRelevantUsers } = props;

  const classes = useStyles();

  const handleSearchNameChange = (event, option) => {
    const { value } = event.target;
    setSelectedName(option || value || null);

    if (!value && !value) {
      handleUpdate();
    }
  };

  const handleSearchNameClick = () => {
    getRelevantUsers();
  };

  return (
    <Paper className={classes.root}>
      <SearchIcon className={classes.icon} />
      <NoPaddingAutocomplete
        freeSolo
        className={classes.input}
        options={allUsers}
        getOptionLabel={(option) => option}
        onChange={handleSearchNameChange}
        onInputChange={(e) => {
          handleSearchNameChange(e);
        }}
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
