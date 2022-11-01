import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Switch,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  Divider,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Context from '../../../../context/Context';
import validate from 'validate.js';
import Alert from '@material-ui/lab/Alert';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'required field' },
    email: true,
    length: {
      maximum: 64,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {},
  alertMessage: {
    marginTop: theme.spacing(2),
  },
  btnGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  alertNotFound: {
    width: '100%',
  },
  expirationCell: {
    display: 'flex',
  },
}));

const ChangeStatus = (props) => {
  const classes = useStyles();
  const {
    userSearch,
    resultsCostumer,
    fetchErrors,
    setCostumerResult,
    handleStatusChange,
    ...rest
  } = props;

  const [formState, setFormState] = useState({
    values: {},
    isValid: false,
    errors: {},
    touched: {},
  });
  const [switchstate, setSwitchState] = useState(false);
  const [statusExpirationDate, setStatusExpirationTime] = useState('');

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    !resultsCostumer &&
      setFormState((prevState) => ({
        ...prevState,
        values: { ...prevState.values, expirationDate: null },
      }));
  }, [resultsCostumer]);

  useEffect(() => {
    const timeInAYear = getYearTime();
    setStatusExpirationTime(timeInAYear);
  });
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
      touched: { [name]: true },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCostumerResult(null);
    userSearch(formState.values);
  };

  const currentDate = new Date().toISOString().split('T');

  const getYearTime = () => {
    const year = currentDate[0].split('-');
    const yearPlusOne = parseInt(year[0]) + 1;
    year.splice(0, 1, `${yearPlusOne}`);
    year.reverse();
    const yearTime = year.join('-');
    return yearTime;
  };

  const grantVipStatus = () => {
    handleStatusChange(formState.values);
  };

  const handleSwitch = (e) => {
    const { checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, expirationDate: null },
    }));
    setSwitchState(checked);
  };
  return (
    <>
      <Grid item md={6} xs={12}>
        <Card {...rest} className={classes.root}>
          <form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <CardHeader
              title='Search Costumer'
              titleTypographyProps={{ variant: 'h2' }}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    error={hasError('email')}
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    label='Email Address'
                    margin='dense'
                    name='email'
                    onChange={handleChange}
                    required
                    value={formState.values.email || ''}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={4} className={classes.btnGrid}>
                  <Button
                    variant='contained'
                    disabled={formState.isValid ? false : true}
                    type='submit'
                  >
                    Search
                  </Button>{' '}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </form>
          <CardActions>
            {resultsCostumer && (
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Costumer Email</TableCell>
                      <TableCell align='center'>Current Status</TableCell>
                      <TableCell align='center'>
                        {resultsCostumer.currentStatus === 'keepers_vip' ? (
                          <Typography>Expires</Typography>
                        ) : (
                          <>
                            <label>Expires</label>
                            <Switch
                              checked={switchstate}
                              onChange={handleSwitch}
                              color='primary'
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                          </>
                        )}
                      </TableCell>
                      <TableCell align='center'>VIP since</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row' align='center'>
                        {resultsCostumer.email}
                      </TableCell>
                      <TableCell align='center'>
                        {resultsCostumer.currentStatus}
                      </TableCell>
                      <TableCell align='center'>
                        {resultsCostumer.currentStatus === 'keepers_vip' ? (
                          <TextField
                            id='date'
                            type='date'
                            defaultValue={currentDate[0]}
                            className={classes.textField}
                            disabled
                          />
                        ) : switchstate ? (
                          <TextField
                            id='date'
                            type='date'
                            defaultValue={currentDate[0]}
                            className={classes.textField}
                            name='expirationDate'
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              min: currentDate[0],
                            }}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography>{statusExpirationDate}</Typography>
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {resultsCostumer.currentStatus === 'keepers_vip' ? (
                          <Typography variant='body1' type='text'>
                            VIP since
                          </Typography>
                        ) : (
                          <Button variant='contained' onClick={grantVipStatus}>
                            Grant VIP
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {!resultsCostumer && fetchErrors.activateAlert ? (
              <Alert className={classes.alertNotFound} severity='error'>
                {' '}
                {fetchErrors.message}
              </Alert>
            ) : (
              <Typography>{''}</Typography>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ChangeStatus;
