import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { AddNewStudent } from './components';
import SearchInput from '../../../../../components/SearchInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '90vh',
    maxWidth: '100vh',
    overflowY: 'auto',
    transform: 'translate(20vw, 20px)',
    width: '70%',
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  TopButtons: {
    marginRight: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  TopButtons: {
    marginRight: theme.spacing(1),
  },
  root: {
    display: 'grid',
    marginBottom: theme.spacing(2),
  },
}));

const StudentToolbar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { onUpdate } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onUpdate();
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <AddNewStudent />
    </div>
  );

  return (
    <div>
      <div className={classes.row}>
        <SearchInput></SearchInput>
        <span className={classes.spacer} />

        <Button
          className={classes.TopButtons}
          onClick={handleOpen}
          variant='contained'
        >
          Add user
        </Button>
        <Button
          // onClick={handleOpenAdd}
          variant='contained'
          // disabled={disableButton}
        >
          Delete user
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>
  );
};

export default StudentToolbar;
