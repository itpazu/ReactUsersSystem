import React, { useState, useContext, useEffect } from 'react';
import { StudentTable, StudentToolbar } from './components';
import { makeStyles } from '@material-ui/styles';
import Context from '../../context/Context';
import StudentSkillsContext from '../../context/StudentSkillsContext';
import { getAllStudent } from '../../lib/api';
import SearchInput from '../../components/SearchInput';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [updateList, setUpdateList] = useState(null);
  const context = useContext(Context);
  const { makeApiRequest } = context;
  const [tableInfo, setTableInfo] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [firsNameList, setfirsNameList] = useState([]);

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
  }, []);

  const getStudentFromDb = () => {
    makeApiRequest(getAllStudent, null, editData, getStudentFromDb, null);
  };

  const editData = (data) => {
    const list = data;
    const newList = list.map((item) => item.first_name);
    setTableInfo(list);
    setfirsNameList(newList);
  };

  const updateUserList = () => {
    const currentList = tableInfo;
    if (searchResult) {
      const updatedList = currentList.filter((item) => {
        return item.first_name
          .toLowerCase()
          .includes(searchResult.toLocaleLowerCase());
      });
      setTableInfo(updatedList);
    } else {
    }
  };

  return (
    <StudentSkillsContext.Provider
      value={{
        tableInfo,
        tableHeaders,
        getStudentFromDb,
        setSearchResult,
        updateUserList,
        firsNameList,
      }}
    >
      <div className={classes.root}>
        <div>
          <StudentToolbar /*onUpdate={onUpdtae}*/ />
        </div>
        <StudentTable updateList={updateList} />
      </div>
    </StudentSkillsContext.Provider>
  );
};

export default HomePage;
