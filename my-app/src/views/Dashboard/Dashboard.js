import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Context from '../../context/Context';

import { ChangeStatus } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const context = useContext(Context);
  const [costumerResult, setCostumerResult] = useState(null);
  const costumers = [
    {
      email: 'email@example.com',
      _id: '123456',
      currentStatus: 'VIP',
    },
    {
      email: 'email@examples.com',
      _id: '88888',
      currentStatus: 'regular',
    },
  ];

  const searchUser = (mail) => {
    const costumer = costumers.find(({ email }) => email === mail.email);
    console.log(costumer);

    setCostumerResult(costumer);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ChangeStatus
            userSearch={searchUser}
            resultsCostumer={costumerResult}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
