import axios from 'axios';

// const baseURL =
//   'http://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com';

export const getName = () => {
  return axios.get(
    `http://KeepersHomeStaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com/get_doc`
  );
};
