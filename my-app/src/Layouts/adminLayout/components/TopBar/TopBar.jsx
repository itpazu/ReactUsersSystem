import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Context from '../../../../context/Context';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    height: '64px',
    backgroundColor: theme.palette.topBar,
    margin: 0,
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const TopBar = (props) => {
  const context = useContext(Context);
  const classes = useStyles();
  const { onSidebarOpen } = props;

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link to='/'>
          <img
            alt='logo'
            src='/images/hogwarts_school_of_witchcraft_and_wizardry_coat_of_arms.png'
            height='50'
            width='50'
          />
        </Link>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {context.darkState === true ? (
            <Brightness5Icon style={{ color: 'white' }} />
          ) : (
            <Brightness4Icon style={{ color: 'white' }} />
          )}
          <Switch
            checked={context.darkState}
            onChange={context.handleThemeChange}
          />
          <div className={classes.flexGrow} />
        </div>
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            onClick={context.handleLogOut}
            style={{ color: 'white' }}
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
