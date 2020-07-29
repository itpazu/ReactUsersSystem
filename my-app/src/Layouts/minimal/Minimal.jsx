import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TopBar from './components/TopBar/TopBar';
import SignIn from '../../views/SignIn';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginRoute } from '../../privateRoutes/PrivateRoute';
import ResetRequest from '../../views/ResetPassword/ResetRequest';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '-webkit-fill-available',
  },
  content: {
    height: 'inherit',
  },
}));

const Minimal = (props) => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <div>
          <TopBar />
        </div>
        <main className={classes.content}>
          <LoginRoute eaxct path='/login' component={SignIn} />
          <LoginRoute eaxct path='/reset_pass' component={ResetRequest} />
        </main>
      </div>
    </Router>
  );
};

export default Minimal;
