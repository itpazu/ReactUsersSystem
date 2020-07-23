import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Context from '../../../../context/Context';
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    height: '60px',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const TopBar = (props) => {
  const { className, onSidebarOpen, handleLogout, token, ...rest } = props;
  const context = useContext(Context);
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {token ? (
          <Link to='/'>
            <img
              alt='logo'
              src='/images/logos/keepers_child_safety_2nd_icon.png'
              height='50'
              width='50'
            />
          </Link>
        ) : (
          <Link to='/'>Home</Link>
        )}
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            color='inherit'
            onClick={context.LogOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
