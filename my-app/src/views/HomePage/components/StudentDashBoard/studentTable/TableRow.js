import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExistingSkill from './studentList';
import AddSkill from './studentList/addNewSkill';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  existingskills: {
    flexWrap: 'wrap',
  },
  tblCell: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '80px',
    textTransform: 'capitalize',
  },

  rootCollapse: {
    width: 'fit-content',
  },
  rootBtn: {
    textTransform: 'capitalize',
    fontSize: '12px',
    padding: '5px',
  },
  rootCell: {
    padding: '0px 8px 5px 8px',
    verticalAlign: 'center',
  },
}));

const StudentTableRow = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const { row } = props;

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <TableBody>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => handleCollapse()}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            align='center'
            component='th'
            scope='row'
            className={classes.tblCell}
          >
            {row._id}
          </TableCell>
          <TableCell align='center' className={classes.tblCell}>
            {row.first_name}
          </TableCell>
          <TableCell align='center' className={classes.tblCell}>
            {row.last_name}
          </TableCell>
          <TableCell align='center' size='small'>
            {row.created_at}
          </TableCell>
          <TableCell align='center' size='small' className={classes.tblCell}>
            {row.last_change}
          </TableCell>
          <TableCell align='center' size='small' className={classes.tblCell}>
            {row.last_update}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={2} classes={{ root: classes.rootCollapse }}>
                <Typography variant='h4' gutterBottom component='div'>
                  Student Administration Zone
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Existing Skills</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className={classes.rootCell}>
                                Skill Name
                              </TableCell>
                              <TableCell className={classes.rootCell}>
                                Skill Level
                              </TableCell>
                              <TableCell className={classes.rootCell}>
                                <AddSkill currentStudent={row} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell align='center'>Desired Skills</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ExistingSkill studentInfo={row} />
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </React.Fragment>
  );
};
export default StudentTableRow;
