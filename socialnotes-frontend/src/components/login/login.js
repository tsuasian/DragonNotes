import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios'
import {AppBar, Button,Toolbar,Table,TableBody,Slide,Tooltip,CircularProgress,CssBaseline,
DialogTitle,DialogContentText,DialogContent,DialogActions,ListItemText,Dialog,TableCell,
TableHead,TableRow,Paper,Typography,IconButton,TextField,MuiThemeProvider} from '@material-ui/core';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    }
  }

  // componentDidMount() {
  //
  // }

  onClick() {
    console.log("clicked!")
    axios.get("http://localhost:8080")
    .then((data) => {
      console.log(data)
      var first = data.data[0].firstName
      var last = data.data[0].lastName
      var name = first + " " + last
      this.setState({
        user: name
      })
      console.log("state", this.state)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      <div className="grandma">
        <div className="user-input">
          <button id="click" onClick={() => this.onClick()}>Get test</button>
        </div>
        <div className="output">
          User: {this.state.user}
        </div>
      </div>
      </div>
    );
  }
}

export default Login;