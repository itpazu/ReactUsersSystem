import React from 'react'
import { makeStyles } from '@material-ui/styles'
import TopBar from './components/TopBar/TopBar'

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}))

const Minimal = (props) => {
  const { children } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <TopBar />
      </div>
      <main className={classes.content}>{children}</main>
    </div>
  )
}

export default Minimal
