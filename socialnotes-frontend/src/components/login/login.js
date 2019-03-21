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
      password: "",
      email: ""
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

  onLogin = () => {
    axios.post("http://localhost:8080/login", {
      email: this.state.email,
      password: this.state.password
    })
    .then((resp) => {
      console.log(resp)
      this.props.user(resp.personalGroup)
      if ( resp.status == '200' ) { this.props.status(true) }
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
            <img src='./DragonIcon_Blue_HEX.png' />
            <h1> Dragon Notes </h1>
            <div className="usernameText">
              <Person className="iconsyay"/>
              <TextField
                onChange={this.onChange('email')}
                value={this.state.email}
                id="email"
                margin="normal"
                type="text"
                placeholder="Email"/>
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
                onClick={this.onLogin}
                >Login
              </Button>
              <Button
                className="btnStyleCustom"
                onClick={this.props.switchMode}
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
