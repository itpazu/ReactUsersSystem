import React, { useState, useEffect, useContext } from 'react';
import TableStudent from './tableStudent';
import Context from '../../../../../context/Context';
import { getAllStudent } from '../../../../../lib/api';
import StudentSkillsContext from '../../../../../context/StudentSkillsContext';

const FetchTableStudent = (props) => {
  const context = useContext(Context);
  const { makeApiRequest } = context;
  const [studentsData, setStudentData] = useState('');
  const { updateList } = props;
  const tableHeaders = [
    'ID',
    'First Name',
    'Last Name',
    'Matriculation date',
    'Last modification',
    'Updated at',
  ];

  useEffect(() => {
    getStudentFromDb();
  }, [updateList]);

  const getStudentFromDb = () => {
    makeApiRequest(getAllStudent, null, setStudentData, getStudentFromDb, null);
  };

  return (
    <StudentSkillsContext.Provider
      value={{
        getStudentFromDb,
      }}
    >
      <TableStudent tableInfo={studentsData} tableHeaders={tableHeaders} />
    </StudentSkillsContext.Provider>
  );
};
export default FetchTableStudent;
