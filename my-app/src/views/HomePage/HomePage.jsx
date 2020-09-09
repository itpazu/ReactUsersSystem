import React, { useContext } from 'react';
import Context from '../../context/Context';
import AddNewStudent from './AddNewStudent';
import { addStudentToDb } from '../../lib/api';

const HomePage = () => {
  // const context = useContext(Context);
  // const firstName =
  //   context.userInput.first_name.charAt(0).toUpperCase() +
  //   context.userInput.first_name.slice(1);
  // const lastName =
  //   context.userInput.last_name.charAt(0).toUpperCase() +
  //   context.userInput.last_name.slice(1);

  return <div /*className='homePageImage'*/>{/* <AddNewStudent /> */}</div>;
};

export default HomePage;
