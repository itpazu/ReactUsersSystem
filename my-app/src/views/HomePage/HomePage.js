import React, { useState } from 'react';
import { StudentTable, StudentToolbar } from './components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [updateList, setUpdateList] = useState(null);

  const onUpdtae = () => {
    setUpdateList(!updateList);
  };

  return (
    <div className={classes.root}>
      <div>
        <StudentToolbar onUpdate={onUpdtae} />
      </div>
      <StudentTable updateList={updateList} />
    </div>
  );
};

export default HomePage;
