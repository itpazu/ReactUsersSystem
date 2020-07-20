import palette from './palette';
import { typography } from './typography';
import { colors } from '@material-ui/core';

export const overrides = {
  MuiButton: {
    contained: {
      boxShadow:
        '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
      backgroundColor: '#00D4ED',
    },
  },
  MuiIconButton: {
    root: {
      color: palette.icon,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
      },
    },
  },
  MuiPaper: {
    elevation1: {
      boxShadow:
        '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    },
  },
  MuiTableCell: {
    root: {
      ...typography.body1,
      borderBottom: `1px solid ${palette.divider}`,
    },
  },
  MuiTableHead: {
    root: {
      backgroundColor: colors.grey[50],
    },
  },
  MuiTableRow: {
    root: {
      '&$selected': {
        backgroundColor: palette.background.default,
      },
      '&$hover': {
        '&:hover': {
          backgroundColor: palette.background.default,
        },
      },
    },
  },
  MuiTypography: {
    gutterBottom: {
      marginBottom: 8,
    },
  },
};
