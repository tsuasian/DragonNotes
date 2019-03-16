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

  registered() {
    this.setState({ mode: 'login' })
  }


  render(){
    return(
      (this.state.mode=='register')
      ? <Register
          switchMode={this.switchMode.bind(this)}
          done={() => this.registered()}
          // onRegister={this.onRegister}
        />
      : <Login
          switchMode={this.switchMode.bind(this)}
          status={this.props.status}
          // onLogin={this.onLogin}
        />
    )
  }
}
