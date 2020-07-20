import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import { typography } from './typography';
import { overrides } from './overrides';

export const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  // props: {
  //   MuiButton: {
  //     variant: 'contained',
  //     color: 'primary',
  //   },
  // },
});
