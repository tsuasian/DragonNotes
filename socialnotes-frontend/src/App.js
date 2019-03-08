import React, {Component} from 'react'
import Login from './components/login/login.js'
import Register from './components/login/register.js'
import {AppBar,Button,Toolbar,Table,TableBody,Slide,Tooltip,CircularProgress,CssBaseline,Paper,Typography,IconButton,TextField,MuiThemeProvider} from '@material-ui/core';
import './components/css/register.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logedIn: false
    }
  }

  loggedIn = (status) => {
    if (status == true) {
      this.setState({
        logedIn: true
      })
    } else {
      this.setState({
        logedIn: false
      })
    }
  }

  render() {
    return (
      this.state.logedIn ?
      <Login />
      : <Register status={this.loggedIn}/>
    )
  }
}
