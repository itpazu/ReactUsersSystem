import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  Divider,
  Button,
  TextField,
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
}));

const ChangeStatus = (props) => {
  const classes = useStyles();
  const {
    userSearch,
    resultsCostumer,
    fetchErros,
    setCostumerResult,
    ...rest
  } = props;

  const [formState, setFormState] = useState({
    values: {},
    isValid: false,
    errors: {},
    touched: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      values: { [name]: value },
      touched: { [name]: true },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCostumerResult(null);
    userSearch(formState.values);
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
            {resultsCostumer ? (
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>Costumer Email</TableCell>
                      <TableCell align='left'>Current Status</TableCell>
                      <TableCell align='left'>Change Status</TableCell>
                      <TableCell align='left'>Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        {resultsCostumer.userId}
                      </TableCell>
                      <TableCell align='left'>
                        {resultsCostumer.currentStatus}
                      </TableCell>
                      <TableCell align='left'>
                        {resultsCostumer.currentStatus === 'keepers_vip' ? (
                          <Button variant='contained'>Demote VIP</Button>
                        ) : (
                          <Button variant='contained'>Grant VIP</Button>
                        )}
                      </TableCell>
                      {/* <TableCell align='left'>
                        <Alert
                          className={classes.alertMessage}
                          severity={resultsCostumer ? 'success' : 'error'}
                        ></Alert>
                      </TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : fetchErros.activateAlert ? (
              <Alert className={classes.alertNotFound} severity='error'>
                {' '}
                {fetchErros.message}
              </Alert>
            ) : (
              <></>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ChangeStatus;
