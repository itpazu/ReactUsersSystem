import axios from 'axios';

const baseURL =
  'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com';

// const baseURL = 'http://127.0.0.1:5000'

export const LogIn = (data) => {
  return axios.post(`${baseURL}/login`, data, { withCredentials: true });
};

export const refreshToken = (userId) => {
  const data = { _id: userId };
  const headers = {
    headers: {
      credentials: 'cross-site',
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/refresh_token`, data, headers);
};

export const register = (newUser, userCredentials) => {
  const csrf = userCredentials.csrf;
  const body = newUser;
  body._id = userCredentials.userId;
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: csrf,
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/add_user`, body, headers);
};

export const deleteUser = (userId, userCredentials) => {
  const body = { user_id: userId, _id: userCredentials.userId };

  const data = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
    data: body,
  };

  return axios.delete(`${baseURL}/delete_user`, data);
};

export const allUsers = (userCredentials) => {
  const body = { _id: userCredentials.userId };

  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
  };

  return axios.post(`${baseURL}/all_users`, body, headers);
};

export const checkTokenForPasswordReset = (userId, token) => {
  const body = { _id: userId };

  const headers = {
    headers: {
      token: token,
    },
  };

  return axios.post(`${baseURL}/check_token`, body, headers);
};

export const changePassword = (data) => {
  return axios.post(`${baseURL}/change_password`, data);
};

export const solicitNewPassword = (data) => {
  return axios.post(`${baseURL}/newpass_solicit`, data);
};

export const unblockSystemUser = (email, userCredentials) => {
  const data = {
    headers: {
      Authorization: userCredentials.csrf,
      credentials: 'cross-site',
    },
    withCredentials: true,
    data: { _id: userCredentials.userId, email: email },
  };

  return axios.delete(`${baseURL}/unblock_user`, data);
};

export const submitUserEditDetails = (data, admin) => {
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: admin.csrf,
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/edit_account_details`, data, headers);
};

export const getUserInfoRefresh = (user) => {
  const data = { _id: user.userId };
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: user.csrf,
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/get_user_info`, data, headers);
};

export const addProfileImage = (data, userCredentials) => {
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/upload_file`, data, headers);
};

export const deleteProfileImage = (userCredentials) => {
  const newData = {
    headers: {
      Authorization: userCredentials.csrf,
      credentials: 'cross-site',
    },
    withCredentials: true,
    data: { _id: userCredentials.userId },
  };

  return axios.delete(`${baseURL}/delete_photo`, newData);
};

export const getCostumerStatus = (email, userCredentials) => {
  const url = `${baseURL}/get_customer/${email.email}`;
  const payload = {
    headers: {
      Authorization: userCredentials.csrf,
      credentials: 'cross-site',
    },
    withCredentials: true,
    body: {
      _id: userCredentials.userId,
    },
  };

  return axios.get(url, payload);
};
