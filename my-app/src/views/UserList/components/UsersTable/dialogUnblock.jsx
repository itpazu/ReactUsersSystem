import React, { useState, useContext } from 'react'
import { Button, Dialog } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { unblockSystemUser } from '../../../../lib/api'
import Context from '../../../../context/Context'
import Alert from '@material-ui/lab/Alert'

const DialogUnblock = (props) => {
  const { closeUnblock, OpenDialog, userDetails, getAllUsers, ...rest } = props
  const { blockedUserId, userName, emailAddress } = userDetails
  const handleClose = () => {
    closeUnblock()
  }
  const context = useContext(Context)
  const { handleLogOut, currentlyLoggedUser, refreshCredentials } = context
  const [activateAlert, setActivateAlert] = useState({
    activate: false,
    message: null
  })

  const handleUnblock = async () => {
    try {
      await unblockSystemUser(
        currentlyLoggedUser,
        emailAddress
      )
      getAllUsers()
      closeUnblock()
    } catch (error) {
      if (error.response.status == '401') {
        handleLogOut()
      } else if (error.response.status == '403') {
        await refreshCredentials(handleUnblock)
      } else {
        setActivateAlert({
          activate: true,
          message: JSON.stringify(error.response.data)
        })
      }
    }
  }

  return (
    <div>
      <Dialog
        open={OpenDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          <div>Unblock the following User? </div>
          <span>
            {userName} ({blockedUserId}){' '}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            cancel
          </Button>
          <Button onClick={handleUnblock} color='primary' autoFocus>
            unblock
          </Button>
        </DialogActions>
        {activateAlert.activate && (
          <Alert
            // className={classes.submitButton}
            severity='error'
          >
            {activateAlert.message && activateAlert.message}
          </Alert>
        )}
      </Dialog>
    </div>
  )
}

export default DialogUnblock