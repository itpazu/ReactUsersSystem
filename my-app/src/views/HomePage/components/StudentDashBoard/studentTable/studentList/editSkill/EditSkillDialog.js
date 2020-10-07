import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

  rootEdit: {
    textTransform: 'capitalize',
    fontSize: '10px',
    backgroundColor: 'green',
    color: 'white',
    padding: '2px',
  },
  rootBtnDialog: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(1),
    padding: '2px',
  },
  rootDialog: {
    textAlign: 'center',
  },
}));

const EditSkill = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [skillLevel, setSkillLevel] = useState('');
  const [confirmBtnStatus, setConfirmBtnStatus] = useState(true);
  const { currentStudent, skill, level, submitEditSkill } = props;

  const handleClickOpen = () => {
    setSkillLevel('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSkillLevelChange = (event) => {
    setConfirmBtnStatus(false);
    setSkillLevel(event.target.value);
  };

  const submitSkillChange = async (event) => {
    event.preventDefault();
    await submitEditSkill({
      id: currentStudent._id,
      level: skillLevel,
      skill: skill[0],
    });
    handleClose();
  };
  return (
    <React.Fragment>
      <Button
        varaint='contained'
        classes={{ root: classes.rootEdit }}
        onClick={handleClickOpen}
      >
        edit Skill
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        classes={{ root: classes.rootDialog }}
      >
        <DialogTitle id='max-width-dialog-title'>
          Set new skill level for:
          <br />
          {currentStudent.first_name} {currentStudent.last_name},
          <br />({currentStudent._id})
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change level for skill <b>{skill}</b>
          </DialogContentText>
          <form
            className={classes.form}
            noValidate
            onSubmit={submitSkillChange}
          >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='skillLevel'>SKILL LEVEL</InputLabel>
              <Select
                autoFocus
                value={skillLevel || level}
                onChange={handleSkillLevelChange}
                inputProps={{
                  name: 'skillLevel:',
                  id: 'skillLevel',
                }}
              >
                {[1, 2, 3, 4, 5].map((item) => {
                  if (item === parseInt(level)) {
                    return (
                      <MenuItem key={item * 12} disabled value={item}>
                        {item}
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem key={item * 10} value={item}>
                        {item}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>

            <Button
              classes={{ root: classes.rootBtnDialog }}
              variant='contained'
              type='submit'
              disabled={confirmBtnStatus}
            >
              confirm
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default EditSkill;
