import React, {Component, Fragment} from 'react'
import Login from './components/login/login.js'
import NoteList from './components/NoteList/NoteList.js'
import Register from './components/login/register.js'
import {AppBar,Button,Toolbar,Table,TableBody,Slide,Tooltip,CircularProgress,CssBaseline,Paper,Typography,IconButton,TextField,MuiThemeProvider} from '@material-ui/core';
import './components/css/register.css'
import { Redirect, BrowserRouter, Switch } from 'react-router-dom'
import PropTypes from "prop-types";
import NoteArea from "./components/NoteArea/NoteArea";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            data: []
        };
        this.updateMe = this.updateMe.bind(this);
    }

    updateMe() {
        console.log('updating!!!!!!');
        this.updateList();
    }

    //Get notes for the logged in user
    componentDidMount() {
        this.updateList();
    }

    updateList() {
        fetch(
            "http://localhost:8080/notes/1"
        ).then(
            data => data.json()
        ).then(data => this.setState({data}));
    }

    loggedIn = (status) => {
        if (status == true) {
            this.setState({
                loggedIn: true
            })
        } else {
            this.setState({
                loggedIn: false
            })
        }
    };

    // to see the notelist, add <NoteList notes={this.state.data}/> in here somewhere
    render() {
        return (
            <Fragment>

                <NoteArea notes={this.state.data} updateHandler={this.updateMe}/>


            </Fragment>
            // this.state.loggedIn ?
              // <Login />
              // : <Register status={this.loggedIn}/>
        )
    }
}

App.propTypes = {
    data: PropTypes.array
};




