import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import EditSkill from './editSkill';
import DeleteSkill from './deleteSkill';
import StudentSkillsContext from '../../../../../../context/StudentSkillsContext';
import Context from '../../../../../../context/Context';
import {
  changeSkillLevel,
  deleteStudentCapability,
} from '../../../../../../lib/api';

const useRowStyles = makeStyles((theme) => ({
  existingskillsWrapper: {
    display: 'table-footer-group',
  },

  cellDesiredSkill: { verticalAlign: 'baseline' },
  cellExistingSkill: {
    textTransform: 'capitalize',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
  alertCell: {
    verticalAlign: 'baseline',
  },
}));

const ExistingSkill = (props) => {
  const { studentInfo } = props;
  const classes = useRowStyles();
  const studentContext = useContext(StudentSkillsContext);
  const { getStudentFromDb } = studentContext;

  const context = useContext(Context);
  const { makeApiRequest } = context;
  const [errosTable, setErrosTable] = useState({
    activateAlert: false,
    message: '',
  });

  const [skillChnageConfirmation, setSkillChangeConfirmation] = useState({
    activateAlert: false,
  });

  useEffect(() => {
    getStudentFromDb();
  }, [skillChnageConfirmation]);

  const submitEditSkill = async (args) => {
    setErrosTable({
      activateAlert: false,
      message: '',
    });
    setSkillChangeConfirmation({
      activateAlert: false,
    });
    await makeApiRequest(
      changeSkillLevel,
      args,
      setConfirmationSkillChange,
      submitEditSkill,
      setErrosTable
    );
  };

  const DeleteStudentSkill = async (args) => {
    setErrosTable({
      activateAlert: false,
      message: '',
    });
    setSkillChangeConfirmation({
      activateAlert: false,
    });
    await makeApiRequest(
      deleteStudentCapability,
      args,
      setConfirmationSkillChange,
      DeleteStudentSkill,
      setErrosTable
    );
  };

  const setConfirmationSkillChange = (data) => {
    setSkillChangeConfirmation({
      activateAlert: true,
    });
  };
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <Table>
            <TableBody>
              {studentInfo &&
                studentInfo.existing_skills &&
                studentInfo.existing_skills.map((skill, index) => (
                  <TableRow
                    key={skill + JSON.stringify(index)}
                    className={classes.existingskillsWrapper}
                  >
                    <TableCell
                      size='small'
                      className={classes.cellExistingSkill}
                    >
                      {Object.keys(skill)}
                    </TableCell>
                    <TableCell size='small'>{Object.values(skill)}</TableCell>

                    <TableCell size='small'>
                      <EditSkill
                        currentStudent={studentInfo}
                        skill={Object.keys(skill)}
                        level={Object.values(skill)}
                        submitEditSkill={submitEditSkill}
                      />
                      <DeleteSkill
                        currentStudent={studentInfo}
                        skill={Object.keys(skill)}
                        DeleteStudentSkill={DeleteStudentSkill}
                      />
                    </TableCell>
                    <TableCell size='small'></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableCell>
        <TableCell className={classes.cellDesiredSkill}>
          <Table>
            <TableBody>
              {studentInfo &&
                studentInfo.interested_courses &&
                studentInfo.interested_courses.map((skill, index) => (
                  <TableRow key={index * 3}>
                    <TableCell className={classes.cellExistingSkill}>
                      {skill}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableCell>
        <TableCell align='center' className={classes.alertCell}>
          {errosTable.activateAlert && (
            <Alert severity='error'>{errosTable.message}</Alert>
          )}
          {skillChnageConfirmation.activateAlert && (
            <Alert severity='success'>{studentInfo.last_change}</Alert>
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ExistingSkill;
