import React, {Component} from 'react';
import axios from 'axios'
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import Face from '@material-ui/icons/Face';
import {AppBar, Button,Toolbar,Table, TableBody,Slide,Tooltip,CircularProgress,CssBaseline,
DialogTitle,DialogContentText,DialogContent,DialogActions,ListItemText,Dialog,TableCell,
TableHead,TableRow,Paper,Typography,IconButton,TextField,MuiThemeProvider} from '@material-ui/core';
import '../css/register.css'
import theme from '../../theme/theme.js'

class Register extends Component {
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


  onChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  //var self = this; -> reference self in function to refer to "this" state in whole scope, not fx scope
  onRegister = () => {
    console.log("state", this.state)
    axios.post("http://localhost:8080/registerUser", {
      password: this.state.password,
      userName: this.state.username,
      email: this.state.email,
      fName: this.state.fName,
      lName: this.state.lName
    })
    .then((data) => {
      console.log(data)
      if (data.status == "200") { this.props.status(true) }
    })
    .catch((err) => console.log(err))
  }


  render() {
    return (
      <div className="main">
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
        <div className="loginPageBody">
          <Paper className="loginPaper" elevation={1}>
            <Face />
            <h1> Welcome to Social Notes </h1>
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
              <Person className="iconsyay"/>
              <TextField
                onChange={this.onChange('fName')}
                value={this.state.fName}
                id="fName"
                margin="normal"
                type="text"
                placeholder="First Name"/>
            </div>

            <div className="usernameText">
              <Person className="iconsyay"/>
              <TextField
                onChange={this.onChange('lName')}
                value={this.state.lName}
                id="lName"
                margin="normal"
                type="text"
                placeholder="Last Name"/>
            </div>

            <div className="usernameText">
              <Person className="iconsyay"/>
              <TextField
                onChange={this.onChange('email')}
                value={this.state.email}
                id="lName"
                margin="normal"
                type="text"
                placeholder="email"/>
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
            <div className="usernameText">
              <Lock className="iconsyay"/>
              <TextField
                className="lastinputLog"
                onChange={this.onChange('confPassword')}
                type="password"
                value={this.state.confPassword}
                margin="normal"
                placeholder="Retype Password"/>
            </div>
              <Button
                className="btnStyleCustom"
                onClick={this.onRegister}
                >Register
              </Button>
              <Button
                className="btnStyleCustom"
                onClick={this.props.switchMode}
                >Go Back to Login
              </Button>
          </Paper>
        </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Register;
