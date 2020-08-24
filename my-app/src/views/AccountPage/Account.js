import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Context from '../../context/Context'
import Alert from '@material-ui/lab/Alert'
import { AccountProfile, AccountDetails } from './components'
// import { getUserInfoRefresh } from '../../lib/api'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Account = () => {
  const classes = useStyles()
  const context = useContext(Context)
  const { updateProfileInfo, errorUpdateProfile } = context

  useEffect(() => {
    updateProfileInfo()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>

        {errorUpdateProfile && (
          <Grid xs={12}>
            <Alert className={classes.alertMessage} severity='error'>
              {errorUpdateProfile.message}
            </Alert>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Account
