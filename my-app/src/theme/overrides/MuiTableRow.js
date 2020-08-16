import palette from '../palette'

export default {
  root: {
    '&$selected': {
      backgroundColor: palette.success.white
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.background.default
      }
    }
  }
}
