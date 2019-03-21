import React, {Component, Fragment} from 'react'
import Login from './components/login/login.js'
import LogReg from './components/login/logreg.js'
import NoteList from './components/NoteList/NoteList.js'
import Register from './components/login/register.js'
import {AppBar,Button,Toolbar,Table,TableBody,Slide,Tooltip,CircularProgress,CssBaseline,Paper,Typography,IconButton,TextField,MuiThemeProvider} from '@material-ui/core';
import './components/css/register.css'
import { Redirect, BrowserRouter, Switch } from 'react-router-dom'
import PropTypes from "prop-types";
import NoteArea from "./components/NoteArea/NoteArea";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import theme from './theme/theme'; // Material UI theme that sets colors, fonts etc for project

//14a7f8ce-6fc2-4be1-8fed-dafa6c41cb21
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            data: [],
            groups: [],
            currentGroup: '',
            currentUserID: ''
        };
        this.refreshList = this.refreshList.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    refreshList(groupId) {
        console.log('updating!!!!!!');
        this.updateList(groupId);
    }

    updateList(groupId) {
        // Default
        // if (groupId == null){
        //     groupId = '14a7f8ce-6fc2-4be1-8fed-dafa6c41cb21'
        // }
        console.log("currentGroup", this.state.currentGroup)

        this.setState({currentGroup: groupId});

        console.log("the new group is" + groupId);
        console.log("group: " + groupId);
        //fetches notes for that group id
        fetch(
            "http://localhost:8080/groups/" + groupId
        ).then(
            data => data.json()
        ).then(
            data => this.setState({data})
        );

    }

    //Get notes for the logged in user
    // componentDidMount() {
    //
    //
    // }
    //
    // componentWillReceiveProps(nextProps, nextContext) {
    //   this.updateList(this.state.currentGroup)
    //   this.getGroups();
    // }


    getGroups = () => {
        fetch(
            `http://localhost:8080/groups/user/${this.state.currentUserID}`
        ).then(
            groups => groups.json()
        ).then(groups => this.setState({groups}));
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

    //Get user
    getUser = (personalGroup, userId) => {
      console.log("user id", userId)
      this.setState({
        currentGroup: personalGroup,
        currentUserID: userId
      })
      if (this.state.currentGroup) {
        this.updateList(personalGroup);
        this.getGroups();
      }

    }

    // getPersonalGroupID(userID) {
    //
    // }

    // to see the notelist, add <NoteList notes={this.state.data}/> in here somewhere
    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                <HeaderBar currentGroup = {this.state.currentGroup} groups={this.state.groups} updateHandler={this.refreshList}/>
                { this.state.loggedIn
                  ? <NoteArea notes={this.state.data} updateHandler={this.refreshList} groups={this.state.groups} userName={"Tim Chang"} currentGroup = {this.state.currentGroup} currentUserId={this.state.currentUserID}/>
                  : <LogReg status={this.loggedIn} user={this.getUser} />
                }
                </MuiThemeProvider>
            </div>
        )
    }
}

App.propTypes = {
    data: PropTypes.array
};
