import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Context from '../../context/Context'
import { getCustomerStatus } from '../../lib/api'
import { ChangeStatus } from './components'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const context = useContext(Context)
  const [customerResult, setCustomerResult] = useState(null)
  const [errorsFetch, setErrorsFetch] = useState({
    activateAlert: false,
    message: ''
  })
  const { makeApiRequest } = context

  const searchUser = async (mail) => {
    await makeApiRequest(
      getCustomerStatus,
      mail,
      setCustomerResult,
      searchUser,
      setErrorsFetch
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ChangeStatus
            userSearch={searchUser}
            resultsCostumer={customerResult}
            fetchErrors={errorsFetch}
            setCostumerResult={setCustomerResult}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
