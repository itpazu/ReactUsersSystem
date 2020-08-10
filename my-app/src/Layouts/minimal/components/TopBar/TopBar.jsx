import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import Context from '../../../../context/Context'
import Switch from '@material-ui/core/Switch'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness5Icon from '@material-ui/icons/Brightness5'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.topBar
  }
}))

const TopBar = (props) => {
  const { className, ...rest } = props
  const context = useContext(Context)
  const classes = useStyles()

  return (
    <AppBar {...rest} className={classes.root} position='fixed'>
      <Toolbar>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
          {context.darkState === true ? <Brightness5Icon style={{ color: 'white' }} /> : <Brightness4Icon style={{ color: 'white' }} />}
          <Switch checked={context.darkState} onChange={context.handleThemeChange} />
          <div className={classes.flexGrow} />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
