import React, { useEffect, useState, useContext } from 'react';
import Context from '../../../../../../../context/Context';
import StudentSkillsContext from '../../../../../../../context/StudentSkillsContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { addNewSkillToStudent } from '../../../../../../../lib/api';

const Studentskills = [
  'Potions',
  'Ancient Runes',
  'Astronomy',
  'Defense Against the Dark Arts',
  'History of Magic',
  'Transfiguration',
  'Herbology',
  'Flying',
  ' Care of Magical Creatures',
  'Disarming Charm',
  'turning beetles into buttons',
];

const useStyles = makeStyles((theme) => ({
  rootBtn: {
    textTransform: 'capitalize',
    fontSize: '12px',
    padding: '5px',
  },
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
  skillsWrapper: {
    display: 'flex',
  },
  skillName: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  headlineDialog: {
    fontSize: '18px',
    textDecoration: 'bold',
    marginBottom: theme.spacing(2),
  },
  studentName: {
    fontSize: '20px',
  },
}));

const AddSkill = (props) => {
  const { currentStudent, level } = props;
  const classes = useStyles();
  const context = useContext(Context);
  const { makeApiRequest } = context;
  const studentContext = useContext(StudentSkillsContext);
  const { getStudentFromDb } = studentContext;
  const [open, setOpen] = useState(false);
  const [skillLevel, setSkillLevel] = useState('');
  const [chosenSkill, setChosenSkill] = useState('');
  const [switchBtn, setSwitchBtn] = useState(true);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [desiredSkills, setDesiredSkill] = useState([]);
  const [erros, setErros] = useState({
    activateAlert: false,
    message: '',
  });
  let timer;

  useEffect(() => {
    let exSkill = [];
    currentStudent.existing_skills &&
      currentStudent.existing_skills.map((item) =>
        exSkill.push(...Object.keys(item))
      );

    const newExSkills = Studentskills.filter((item) => !exSkill.includes(item));
    setFilteredSkills(newExSkills);

    if (currentStudent.interested_courses) {
      const interestedCourses = newExSkills.filter((item) => {
        return !currentStudent.interested_courses.includes(item);
      });

      setDesiredSkill(interestedCourses);
    } else {
      setDesiredSkill(newExSkills);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentStudent.existing_skills, currentStudent.interested_courses]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSkillLevel('');
    setChosenSkill('');
    setOpen(false);
    setErros({
      activateAlert: false,
      message: '',
    });
  };

  const handleSkillLevelChange = (event) => {
    setSkillLevel(event.target.value);
  };

  const handleSkillChange = (event) => {
    const { value } = event.target;
    setChosenSkill(value);
  };

  const handleChangeSwitch = () => {
    setSwitchBtn(!switchBtn);
    setSkillLevel('');
    setChosenSkill('');
  };

  const submitSkillChange = async (event) => {
    event.preventDefault();
    let args = {
      update: switchBtn,
      skill: chosenSkill,
      level: skillLevel || null,
      id: currentStudent._id,
    };
    await makeApiRequest(
      addNewSkillToStudent,
      args,
      uponSuccessfulChange,
      submitSkillChange,
      uponErros
    );
  };

  const uponSuccessfulChange = async () => {
    await getStudentFromDb();
    handleClose();
  };

  const uponErros = (data) => {
    setErros(data);
    timer = setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <>
      <React.Fragment>
        <Button
          variant='contained'
          classes={{ root: classes.rootBtn }}
          onClick={handleClickOpen}
          disabled={filteredSkills.length > 0 ? false : true}
        >
          add new skill
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
            <div className={classes.headlineDialog}>Add new skill </div>
            <div className={classes.studentName}>
              {currentStudent.first_name} {currentStudent.last_name}{' '}
            </div>
            <br />
            (id : {currentStudent._id})
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose skill-set to update <br />
              (toggle to move bweteen existing / desired skills)
            </DialogContentText>
            <FormControlLabel
              control={
                <Switch
                  checked={switchBtn}
                  onChange={handleChangeSwitch}
                  name='checkedB'
                  color='primary'
                />
              }
              label={switchBtn ? 'Existing Skills' : 'Desired Skills'}
            />
            <form
              className={classes.form}
              noValidate
              onSubmit={submitSkillChange}
            >
              <div className={classes.skillsWrapper}>
                <FormControl className={classes.skillName}>
                  <InputLabel htmlFor='skillLevel'>SKILL NAME</InputLabel>
                  <Select
                    autoFocus
                    value={chosenSkill || ''}
                    onChange={handleSkillChange}
                    inputProps={{
                      id: 'skillname',
                    }}
                  >
                    {switchBtn &&
                      filteredSkills &&
                      filteredSkills.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    {!switchBtn &&
                      desiredSkills &&
                      desiredSkills.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {switchBtn && (
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='skillLevel'>SKILL LEVEL</InputLabel>
                    <Select
                      autoFocus
                      value={skillLevel || ''}
                      onChange={handleSkillLevelChange}
                      inputProps={{
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
                )}
              </div>

              <Button
                classes={{ root: classes.rootBtnDialog }}
                variant='contained'
                type='submit'
                disabled={
                  switchBtn
                    ? chosenSkill && skillLevel
                      ? false
                      : true
                    : chosenSkill
                    ? false
                    : true
                }
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

          {erros.activateAlert && (
            <Alert severity={'error'}>{erros.message}</Alert>
          )}
        </Dialog>
      </React.Fragment>
    </>
  );
};
export default AddSkill;
