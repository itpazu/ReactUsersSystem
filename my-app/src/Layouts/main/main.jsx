import React, { useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import TopBar from './components/TopBar/TopBar';
import Sidebar from './components/sidebar/sidebar';
import Context from '../../context/Context';
import clsx from 'clsx';
import UserList from '../../views/UserList/UserList';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import RouteWithLayout from '../../components/RouteWithLayout/RouteWithLayout';
import { PrivateRoute } from '../../privateRoutes/PrivateRoute';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

const Main = (props) => {
  const { children } = props;
  const context = useContext(Context);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  // const { path, url } = props.match;
  // console.log(path, url);
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
        <main>
          {children}
          <PrivateRoute exact path='/users' component={UserList} />
        </main>
      </div>
    </Router>
  );
};

export default Main;
