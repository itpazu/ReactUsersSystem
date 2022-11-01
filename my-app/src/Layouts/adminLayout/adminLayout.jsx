import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import TopBar from './components/TopBar/TopBar';
import Sidebar from './components/sidebar/sidebar';
import clsx from 'clsx';
import UserList from '../../views/UserList/UserList';
import AccountPage from '../../views/AccountPage/Account';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoute } from '../../privateRoutes/PrivateRoute';
import { HomePage } from '../../views/HomePage';

const Main = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 56,
      height: '-webkit-fill-available',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    shiftContent: {
      paddingLeft: 240,
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Router>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop,
        })}
      >
        <TopBar onSidebarOpen={handleSidebarOpen} />

        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />
        <main height='100%'>
          <PrivateRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/users' component={UserList} />
          <PrivateRoute exact path='/account' component={AccountPage} />
          {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
          {/* <PrivateRoute exact path='/settings' component={Settings} /> */}
        </main>
      </div>
    </Router>
  );
};

export default Main;
