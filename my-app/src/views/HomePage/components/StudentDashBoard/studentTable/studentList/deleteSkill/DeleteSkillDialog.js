import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  root: {
    textTransform: 'capitalize',
    fontSize: '10px',
    backgroundColor: 'red',
    color: 'white',
    padding: '2px',
  },

  rootDialog: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(1),
    padding: '2px',
  },
}));
const DeleteSkill = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { currentStudent, skill, DeleteStudentSkill } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dialogText = (
    <p>
      Delete skill{' '}
      <strong>
        <u>{skill} </u>
      </strong>
      for student
      <br />
      {currentStudent.first_name} {currentStudent.last_name} ?
    </p>
  );
  const handleSubmitDelete = async () => {
    await DeleteStudentSkill({
      userId: currentStudent._id,
      skill: skill[0],
    });
    handleClose();
  };

  return (
    <div>
      <Button
        varaint='contained'
        classes={{ root: classes.root }}
        onClick={handleClickOpen}
      >
        delete Skill
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='delete-skill'
        aria-describedby='delete-skill'
      >
        <DialogTitle id='delete-skill-dialog-title'>{dialogText}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleSubmitDelete}>
            confirm
          </Button>

          <Button color='primary' onClick={handleClose} autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteSkill;
