import React, { Component } from 'react';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import Face from '@material-ui/icons/Face';
import '../css/login.css'
import theme from '../../theme/theme.js'
import axios from 'axios'
import {AppBar, Button,Toolbar,Table,TableBody,Slide,Tooltip,CircularProgress,CssBaseline,
DialogTitle,DialogContentText,DialogContent,DialogActions,ListItemText,Dialog,TableCell,
TableHead,TableRow,Paper,Typography,IconButton,TextField,MuiThemeProvider} from '@material-ui/core';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confPassword: "",
      email: "",
      fName: "",
      lName: ""
    }
  }

  // componentDidMount() {
  //
  // }

  onChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  //var self = this; -> reference self in function to refer to "this" state in whole scope, not fx scope

  backRegister = () => {
    this.props.status(false)
  }

  render() {
    return (
      <div className="main">
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
        <div className="loginPageBody">
          <Paper className="loginPaper" elevation={1}>
            <Face />
            <h1> Social Notes </h1>
            <div className="usernameText">
              <Person className="iconsyay"/>
              <TextField
                onChange={this.onChange('username')}
                value={this.state.username}
                id="username"
                margin="normal"
                type="text"
                placeholder="Username"/>
            </div>

            <div className="usernameText">
              <Lock className="iconsyay"/>
              <TextField
                onChange={this.onChange('password')}
                type="password"
                margin="normal"
                value={this.state.password}
                placeholder="Password"/>
            </div>
              <Button
                className="btnStyleCustom"
                // onClick={this.onRegister}
                >Register
              </Button>
              <Button
                className="btnStyleCustom"
                // onClick={this.backRegister()}
                >Go Back to Register
              </Button>
          </Paper>
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
