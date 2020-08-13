import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  black,
  white,
  type: 'dark',
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.orange[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.deepOrange[900],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[50],
    secondary: colors.blueGrey[50],
    link: colors.blue[600]
  },
  background: {
    default: '#322f3d',
    paper: '#636363'
  },
  topBar: colors.orange[500],
  button: white,
  icon: colors.blueGrey[600],
  divider: colors.grey[600]
}
