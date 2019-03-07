import React, {Component} from 'react';
import axios from 'axios'

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

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Register;
