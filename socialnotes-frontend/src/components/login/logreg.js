import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Login from './login';
import Register from './register';

export default class LogReg extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'login',
    }
  }

  switchMode() {
    this.state.mode=='register'
    ? this.setState({mode: 'login'})
    : this.setState({mode: 'register'})
  }

  render(){
    return(
      (this.state.mode=='register')
      ? <Register
          switchMode={this.switchMode.bind(this)}
          // onRegister={this.onRegister}
        />
      : <Login
          switchMode={this.switchMode.bind(this)}
          // onLogin={this.onLogin}
        />
    )
  }
}
