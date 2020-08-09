import React, { useState } from 'react';
import { Button, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { unblockSystemUser } from '../../../../lib/api';

const DialogUnblock = (props) => {
  const { closeUnblock, OpenDialog, userDetails, loggedUser, ...rest } = props;
  const { blockedUserId, userName, emailAddress } = userDetails;
  const handleClose = () => {
    closeUnblock();
  };
  const handleUnblock = async () => {
    try {
      const response = await unblockSystemUser(loggedUser, emailAddress);
      console.log(response);
      closeUnblock();
    } catch (error) {
      console.log(error.response);
    }
  };
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
          <DialogContentText id='alert-dialog-description'></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            cancel
          </Button>
          <Button onClick={handleUnblock} color='primary' autoFocus>
            unblock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogUnblock;
