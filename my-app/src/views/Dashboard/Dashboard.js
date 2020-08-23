import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Context from '../../context/Context';
import { getCostumerStatus } from '../../lib/api';
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
  const [errosFetch, setErrosFetch] = useState({
    activateAlert: false,
    message: '',
  });
  const { makeApiRequest } = context;

  const searchUser = async (mail) => {
    await makeApiRequest(
      getCostumerStatus,
      mail,
      setCostumerResult,
      searchUser,
      setErrosFetch
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ChangeStatus
            userSearch={searchUser}
            resultsCostumer={costumerResult}
            fetchErros={errosFetch}
            setCostumerResult={setCostumerResult}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
