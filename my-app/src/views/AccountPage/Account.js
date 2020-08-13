import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Context from '../../context/Context'

import { AccountProfile, AccountDetails } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Account = () => {
  const classes = useStyles()
  const context = useContext(Context)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile profile={context.userInput} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails profile={context.userInput} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Account
