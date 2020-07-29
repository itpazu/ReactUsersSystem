import { createMuiTheme } from '@material-ui/core/styles'
import palette from './palette'
import typography from './typography'

export const theme = createMuiTheme({
  palette,
  typography,
  props: {
    Link: {
      color: 'white'
    }
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
})

export default theme
