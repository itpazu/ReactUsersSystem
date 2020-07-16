import axios from 'axios';

// const baseURL =
//   'http://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com';

export const getName = () => {
  return axios.get(`https://keepers-home-stage.keeperschildsafety.net/get_doc`);
};

export const LogIn = (data) => {
  console.log(data);
  return axios.post(
    'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com/login',
    data,
    { withCredentials: true }
  );
};
// export const LogIn = (data) => {
//   return axios.post('http://127.0.0.1:5000/login', data);
// };
// export const authenticateUser = () => {
//   // const options = { headers: { Authorization: token } };
//   // const option = {
//   //   headers: {
//   //     'Content-Type': 'application/json; charset=utf-8',
//   //     Accept: 'application/json',
//   //   },
//   //   credentials: 'include', // <= that's what changed
//   // };
//   return axios.get('http://127.0.0.1:5000/api/auth', {
//     withCredentials: true,
//     credentials: 'cross-site',
//   });
// };
export const authenticateUser = () => {
  const userId = { user_id: '00000007' };
  return axios.post(
    'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com/',
    { user_id: '00000007' },
    { withCredentials: true }
  );
};

// export const authenticateUser = () => {
//   const userId = { user_id: '00000007' };

//   return axios.post('http://127.0.0.1:5000/', userId, {
//     withCredentials: true,
//   });
// };

export const Logout = () => {
  return axios.get(
    'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com/logout'
  );
};
