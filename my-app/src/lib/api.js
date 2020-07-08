import axios from 'axios';

// const baseURL =
//   'http://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com';

export const getName = () => {
  return axios.get(`https://keepers-home-stage.keeperschildsafety.net/get_doc`);
};
