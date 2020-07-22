import axios from 'axios'

const baseURL =
  'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com'

// const baseURL = 'http://127.0.0.1:5000';

export const LogIn = (data) => {
  console.log(data)
  return axios.post(`${baseURL}/login`, data, { withCredentials: true })
}

export const authenticateUser = (data, csrf) => {
  const headers = {
    headers: {
      credentials: 'cross-site',
      withCredentials: true,
      Authorization: csrf
    },
    withCredentials: true
  }

  console.log(headers)
  return axios.post(`${baseURL}/test`, data, headers)
}

export const Logout = () => {
  return axios.get(`${baseURL}/logout`)
}

export const register = newUser => {
  return axios.post(`${baseURL}/add_user`, {
    first_name: newUser.firstName,
    last_name: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
    user_id: newUser.userId,
    admin: newUser.admin
  }).then(res => {
    console.log(res)
  })
}

export const deleteUser = userId => {
  return axios.delete(`${baseURL}/delete_user/${userId}`)
}
