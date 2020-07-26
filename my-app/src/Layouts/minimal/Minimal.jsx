import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TopBar from './components/TopBar/TopBar';
import SignIn from '../../views/SignIn';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { LoginRoute } from '../../privateRoutes/PrivateRoute';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%',
  },
  content: {
    height: '100%',
  },
}));

const Minimal = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <TopBar />
      </div>
      <main className={classes.content}>
        <SignIn />
      </main>
    </div>
  );
};

export default Minimal;
