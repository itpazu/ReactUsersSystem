import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00D4ED',
      contrastText: '#fff',
      dark: '#0f88ad',
    },
    secondary: {
      main: '#22C1F2',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },

  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
});
