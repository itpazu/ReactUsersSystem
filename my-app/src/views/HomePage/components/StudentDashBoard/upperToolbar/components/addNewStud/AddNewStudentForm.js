import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Select,
  Container,
  Checkbox,
  Button,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js';
import Alert from '@material-ui/lab/Alert';

const schema = {
  first_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 20,
      minimum: 2,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: 'required field' },
    length: {
      maximum: 20,
      minimum: 2,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'required field' },
    email: true,
    length: {
      maximum: 64,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    marginTop: theme.spacing(8),
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  selectBox: {
    width: '80%',
    marginRight: '2%',
  },
  headlines: {
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  chosenSkill: {
    justifyContent: 'space-between',
  },
  gridText: {
    justifyContent: 'center',
  },
  radio: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  contSkills: {
    marginBottom: '25px',
    marginTop: '25px',
    minWidth: '250px',
    margin: '0 0 25',
  },
  clearBtn: {
    marginLeft: '5px',
    color: 'white',
    backgroundColor: '#C82333',
    borderRadius: '5px',
    minWidth: '25px',
    borderStyle: 'none',
    height: '25px',
  },
  labelBtn: {
    marginRight: '10px',
  },
  desiredSkillsHeadline: {
    marginTop: '32px',
    marginBottom: '16px',
  },
  desiredSkill: {
    justifyContent: 'space-between',
    marginBottom: '25px',
  },
  confirmBtn: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: '25px',
    marginTop: '25px',
  },
  confBtn: {
    width: '100%',
  },
  radioGroupOverride: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legend: {
    fontSize: '18px',
  },
  radioLabel: {
    marginRight: '5px',
  },
  radioTag: {
    padding: '8px',
  },
}));

function AddNewStudentForm(props) {
  const classes = useStyles();
  const {
    labels,
    setFormInput,
    chosenSkills,
    changeLevel,
    HandleOnExistingSkillChange,
    skillList,
    handleOnInterestedInCoursesChange,
    clearSkill,
    addSkill,
    disableConfirmExSkillBtn,
    sendForm,
    uponSuccess,
    errorFetchUsers,
  } = props;

  const [SkillLevelValue, setSkillLevelValue] = useState('');
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    let mounted = true;

    if (mounted) {
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {},
      }));
    }
    return function cleanup() {
      mounted = false;
    };
  }, [formState.values]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    }));
    setFormInput(name, value);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleLevelChange = (e) => {
    const { name, value } = e.target;
    setSkillLevelValue({
      ...SkillLevelValue,
      [name]: value,
    });

    changeLevel(e);
  };
  const handleSelectSkill = (e) => {
    HandleOnExistingSkillChange(e);
  };

  const handleOnInterestedSkillChange = (e) => {
    handleOnInterestedInCoursesChange(e);
  };
  const handleClearSkill = (e) => {
    const name = e.target.name;
    const radioElObj = SkillLevelValue;
    delete radioElObj[name];
    clearSkill(e);
  };

  const handleAddSkill = (e) => {
    addSkill(e);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    sendForm(e);
  };

  return (
    <Container className={classes.root} component='main' maxWidth='sm'>
      <Grid item className={classes.item} xs={12}>
        <Typography variant='h3' className={classes.headlines}>
          Add New Students
        </Typography>
      </Grid>
      {!uponSuccess ? (
        <form onSubmit={handleSubmitForm}>
          <Grid item>
            <Grid container>
              <Grid item className={classes.gridText} xs={12}>
                <TextField
                  error={hasError('first_name')}
                  helperText={
                    hasError('first_name')
                      ? formState.errors.first_name[0]
                      : null
                  }
                  value={formState.values.first_name || ''}
                  type='text'
                  label='FirstName'
                  variant='outlined'
                  name='first_name'
                  autoComplete='on'
                  onChange={handleInputChange}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={hasError('last_name')}
                  helperText={
                    hasError('last_name') ? formState.errors.last_name[0] : null
                  }
                  value={formState.values.last_name || ''}
                  type='text'
                  label='Last Name'
                  variant='outlined'
                  name='last_name'
                  autoComplete='on'
                  className={classes.textField}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='email'
                  error={hasError('email')}
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  value={formState.values.email || ''}
                  label='Email Adress'
                  variant='outlined'
                  name='email'
                  autoComplete='on'
                  onChange={handleInputChange}
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.item} xs={12}>
            <Typography variant='h3'>Existing Skills</Typography>
          </Grid>
          <Grid item className={classes.item} xs={12}>
            <Grid container className={classes.chosenSkill}>
              {chosenSkills.confirmedSkills.map((item, index) => {
                return (
                  <div className={classes.contSkills} key={index}>
                    <Grid item className={classes.radio} key={index + 1}>
                      <FormControl
                        component='fieldset'
                        className={classes.radio}
                      >
                        <FormLabel
                          component='legend'
                          key={index + 40}
                          className={classes.legend}
                        >
                          {item}
                        </FormLabel>
                        <RadioGroup
                          className={classes.radioGroupOverride}
                          aria-label='skillLevel'
                          key={item}
                          name={item}
                          value={SkillLevelValue[item] || '1'}
                          onChange={handleLevelChange}
                          id={item}
                        >
                          {labels.map((label, index) => {
                            return (
                              <>
                                <FormControlLabel
                                  className={classes.radioLabel}
                                  value={label.toString()}
                                  control={
                                    <Radio className={classes.radioTag} />
                                  }
                                  label={label}
                                />
                              </>
                            );
                          })}
                          <button
                            variant='contained'
                            name={item}
                            onClick={handleClearSkill}
                            className={classes.clearBtn}
                          >
                            clear
                          </button>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </Grid>
          <Grid item className={classes.item}>
            <Select
              className={classes.selectBox}
              inputProps={{
                id: 'skill',
              }}
              value={chosenSkills.currentSkill || 'choose-skill'}
              onChange={handleSelectSkill}
              required
            >
              <option value='choose-skill' disabled>
                {' '}
                choose skill
              </option>
              {skillList.map((skill, index) => {
                return (
                  <option value={skill} key={index + 1}>
                    {skill}
                  </option>
                );
              })}
            </Select>
            <Button
              onClick={handleAddSkill}
              disabled={disableConfirmExSkillBtn}
              variant='contained'
            >
              confirm
            </Button>
          </Grid>
          <Typography variant='h3' className={classes.desiredSkillsHeadline}>
            Desired Skills
          </Typography>

          <Grid container className={(classes.item, classes.desiredSkill)}>
            {skillList.map((skill) => {
              return (
                <div key={skill}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={skill}
                        onChange={handleOnInterestedSkillChange}
                        name={skill}
                        color='primary'
                        value={skill}
                      />
                    }
                    label={skill}
                  />
                </div>
              );
            })}
          </Grid>
          {errorFetchUsers.activateAlert && (
            <Alert className={classes.errorAlert} severity={'error'}>
              {errorFetchUsers.message && errorFetchUsers.message}
            </Alert>
          )}
          <Grid container className={classes.confirmBtn}>
            <Grid item xs={6} className={classes.confirmBtn}>
              <Button
                variant='contained'
                className={classes.confBtn}
                type='submit'
                disabled={!formState.isValid}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Alert severity={'success'}>{uponSuccess && uponSuccess}</Alert>
      )}
    </Container>
  );
}

export default AddNewStudentForm;
