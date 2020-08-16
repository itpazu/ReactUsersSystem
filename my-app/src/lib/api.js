import axios from 'axios';

const baseURL =
  'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com';

// const baseURL = 'http://127.0.0.1:5000'

export const LogIn = (data) => {
  return axios.post(`${baseURL}/login`, data, { withCredentials: true });
};

// // remote
// export const authenticateUser = (data, csrf) => {
//   const headers = {
//     headers: {
//       credentials: 'cross-site',
//       Authorization: csrf,
//     },
//     withCredentials: true,
//   };
//   return axios.post(`${baseURL}/test`, data, headers);
// };

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

// for local server only:
// export const authenticateUser = (data, csrf, JwtToken) => {
//   const headers = {
//     headers: {
//       credentials: 'cross-site',
//       Authorization: csrf,
//       token: JwtToken
//     },
//     withCredentials: true
//   }

//   return axios.post(`${baseURL}/test`, data, headers)
// }

export const Logout = () => {
  return axios.get(`${baseURL}/logout`);
};

export const register = (newUser, authenticationInfo) => {
  const csrf = authenticationInfo.csrf;
  const body = newUser;
  body._id = authenticationInfo.userId;
  // const JwtToken = authenticationInfo.Jwt_token; //local serverOnly
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: csrf,
      // token: JwtToken, local server only
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/add_user`, body, headers);
};

export const deleteUser = (userId, authenticationInfo) => {
  const body = { user_id: userId, _id: authenticationInfo.userId };

  const data = {
    headers: {
      credentials: 'cross-site',
      Authorization: authenticationInfo.csrf,
    },
    withCredentials: true,
    data: body,
  };

  return axios.delete(`${baseURL}/delete_user`, data);
};

export const allUsers = (userId, csrf) => {
  const body = { _id: userId };

  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: csrf,
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

export const unblockSystemUser = (admin, email) => {
  const data = {
    headers: {
      Authorization: admin.csrf,
      credentials: 'cross-site',
    },
    withCredentials: true,
    data: { _id: admin.userId, email: email },
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

export const getUserInfoRefresh = (data, admin) => {
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: admin.csrf,
    },
    withCredentials: true,
  };
  return axios.post(`${baseURL}/get_user_info`, data, headers);
};

export const addProfileImage = (data) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return axios.post(`${baseURL}/add_photo`, data, config);
};

export const deleteProfileImage = (data) => {
  return axios.delete(`${baseURL}/delete_photo`, data);
};
