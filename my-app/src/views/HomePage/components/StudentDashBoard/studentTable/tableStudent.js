import React, { useContext } from 'react';
import StudentSkillsContext from '../../../../../context/StudentSkillsContext';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StudentTableRow from './TableRow';

const TableStudent = () => {
  const context = useContext(StudentSkillsContext);
  const { tableHeaders, tableInfo } = context;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeaders.map((header) => (
              <TableCell align='center' key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {tableInfo &&
          tableInfo.map((row) => <StudentTableRow key={row._id} row={row} />)}
      </Table>
    </TableContainer>
  );
};

export default TableStudent;
