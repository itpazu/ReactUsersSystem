import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  TextField,
  Modal,
} from '@material-ui/core';
import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from 'firebase/storage';
import Context from '../../../../context/Context';
import Alert from '@material-ui/lab/Alert';
import storage from '../../../../bin';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  name: {
    textTransform: 'capitalize',
  },
  avatar: {
    height: 100,
    width: 100,
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  inputFields: {
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const AccountProfile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const context = useContext(Context);
  const { userInput } = context;
  const [userAv, setUserAv] = useState('');
  const [modalStyle] = useState(getModalStyle);
  const [openAdd, setOpenAdd] = useState(false);
  const [response, setResponse] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [imageState, setImageState] = useState({
    isValid: false,
    value: '',
  });
  const pathReference = ref(storage, `images/avatar-${userInput._id}.jpg`);

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = () => {
    getDownloadURL(pathReference)
      .then((url) => setUserAv(url))
      .catch((err) => {
        setUserAv('/images/defaultAvatar.jpg');
      });
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAddImage = () => {
    setOpenAdd(false);
    setImageState({
      isValid: false,
      value: '',
    });
  };

  const handleOnAddImageChange = (event) => {
    setImageState({
      isValid: true,
      value: event.target.files[0],
    });
  };

  const handleSubmitImage = (event) => {
    event.preventDefault();
    setResponse(null);
    const file = imageState.value;
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    handleCloseAddImage();
    try {
      await uploadBytesResumable(pathReference, file);
      getAvatar();
    } catch (err) {
      console.error('error on upload');
      setResponse({
        activateAlert: true,
        message: err.message_ || 'server failed',
      });
    }
  };

  const addImage = (
    <div
      style={modalStyle}
      className={classes.paper}
      onSubmit={handleSubmitImage}
    >
      <Typography variant='h2'>Upload a new profile picture:</Typography>
      <form className={classes.root} autoComplete='off'>
        <TextField
          required
          id='standard-basic'
          type='file'
          label='Image File'
          onChange={handleOnAddImageChange}
          name='image'
          className={classes.inputFields}
          inputProps={{ accept: 'image/*' }}
        />
        <Button
          type='submit'
          disabled={!imageState.isValid}
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteImage = async () => {
    handleCloseDelete();
    try {
      await deleteObject(pathReference);
      getAvatar();
    } catch (err) {
      setResponse({
        activateAlert: true,
        message: err.message_ || 'server failed',
      });
    }
  };

  const deleteImage = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant='h2'>
        Are you sure you want to delete your current profile picture?
      </Typography>
      <Button onClick={handleDeleteImage} type='submit'>
        Yes
      </Button>
      <Button onClick={handleCloseDelete}>No</Button>
    </div>
  );

  return (
    <>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent>
          <Box alignItems='center' display='flex' flexDirection='column'>
            <Avatar className={classes.avatar} src={userAv} />
            <Typography
              color='textPrimary'
              gutterBottom
              variant='h3'
              className={classes.name}
            >
              {`${userInput.first_name} ${userInput.last_name}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.uploadButton}
            variant='text'
            onClick={handleOpenAdd}
          >
            Upload picture
          </Button>
          <Button variant='text' onClick={handleOpenDelete}>
            Remove picture
          </Button>
        </CardActions>
        {response && (
          <Alert className={classes.alertMessage} severity='error'>
            {response.message}
          </Alert>
        )}
      </Card>
      <Modal
        open={openAdd}
        onClose={handleCloseAddImage}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addImage}
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteImage}
      </Modal>
    </>
  );
};

export default AccountProfile;
