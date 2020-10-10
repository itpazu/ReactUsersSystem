import axios from 'axios';

// const baseURL = 'https://hogwarts-itpazu.herokuapp.com';

const baseURL = 'http://127.0.0.1:5000';

export const LogIn = (data) => {
  return axios.post(`${baseURL}/login`, data, {
    headers: { credentials: 'cross-site' },
    withCredentials: true,
  });
};

export const refreshToken = (credentials) => {
  const data = { _id: credentials.userId };
  console.log(credentials);
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

  return axios.get(`${baseURL}/all_users`, body, headers);
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
    params: { _id: userCredentials.userId },
    withCredentials: true,
  };

  return axios.get(url, payload);
};

export const changeVipSts = (costumerDetails, userCredentials) => {
  const url = `${baseURL}/change_vip_status`;

  const data = {
    _id: userCredentials.userId,
    costumer_id: costumerDetails.costumer_id,
    end: costumerDetails.end,
  };
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
  };

  return axios.post(url, data, headers);
};

export const addStudentToDb = (newStudent, userCredentials) => {
  const url = `${baseURL}/add_student`;
  const data = {
    _id: userCredentials.userId,
    ...newStudent,
  };
  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
  };
  return axios.post(url, data, headers);
};

export const getAllStudent = (userCredentials) => {
  const body = { _id: userCredentials.userId };

  const headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
  };
  return axios.get(`${baseURL}/students`, body, headers);
};

export const changeSkillLevel = (newSkill, userCredentials) => {
  const body = { _id: userCredentials.userId };
  const headers = {
    params: {
      ...newSkill,
    },
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
  };

  return axios.put(`${baseURL}/capability_edit`, body, headers);
};

export const deleteStudentCapability = (args, userCredentials) => {
  const body = {
    user_id: args.userId,
    _id: userCredentials.userId,
    skill: args.skill,
  };

  const data = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
    data: body,
  };

  return axios.delete(`${baseURL}/delete_skill`, data);
};

export const addNewSkillToStudent = (newSkill, userCredentials) => {
  const body = { _id: userCredentials.userId };
  const headers = {
    params: {
      ...newSkill,
    },
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
    },
    withCredentials: true,
  };

  return axios.post(`${baseURL}/capability_add`, body, headers);
};
