import axios from 'axios'

const baseURL =
  'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com'

// const baseURL = 'http://127.0.0.1:5000'

export const LogIn = (data) => {
  return axios.post(`${baseURL}/login`, data, { withCredentials: true })
}

// remote
export const authenticateUser = (data, csrf) => {
  const headers = {
    headers: {
      credentials: 'cross-site',
      withCredentials: true,
      Authorization: csrf
    },
    withCredentials: true
  }
  return axios.post(`${baseURL}/test`, data, headers)
}

// for local server only:
// export const authenticateUser = (data, csrf, JwtToken) => {
//   const headers = {
//     headers: {
//       credentials: 'cross-site',
//       withCredentials: true,
//       Authorization: csrf,
//       token: JwtToken
//     },
//     withCredentials: true
//   }

//   return axios.post(`${baseURL}/test`, data, headers)
// }

export const Logout = () => {
  return axios.get(`${baseURL}/logout`)
}

export const register = (newUser, authenticationInfo) => {
  const csrf = authenticationInfo.csrf_token
  const body = newUser
  body.user_id = authenticationInfo.user_id
  // const JwtToken = authenticationInfo.Jwt_token; //local serverOnly
  const headers = {
    headers: {
      credentials: 'cross-site',
      withCredentials: true,
      Authorization: csrf
      // token: JwtToken, local server only
    },
    withCredentials: true
  }
  return axios.post(`${baseURL}/add_user`, body, headers)
}

export const deleteUser = (userId) => {
  return axios.delete(`${baseURL}/delete_user/${userId}`)
}

export const allUsers = () => {
  return axios.get(`${baseURL}/all_users`)
}
