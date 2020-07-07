import axios from 'axios';

const baseURL =
  'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com';

export const getName = () => {
  axios.get(`${baseURL}/get_doc`);
};
