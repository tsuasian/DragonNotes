import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import ShareIcon from '@material-ui/icons/Share';
import GroupIcon from '@material-ui/icons/Group';
import {IconButton} from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import '../css/sharedialog.css'
const axios = require('axios');
const styles = require('../../theme/theme');

class ShareDialog extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        openGroup: false,
        groupName: '',
        currentUserId: this.props.currentUserID
      }

    }

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };


    shareNoteInGroup = (groupId, userId) => {
        const updateHandler = (gid) => { this.props.updateHandler(groupId) }
        const shareEndpoint = `http://localhost:8080/groups/notes/`;
        axios.post(shareEndpoint, {
            noteId: this.props.noteId,
            groupId: groupId,
            userId: userId
        })
        .then(function (response) {
          console.log(response);
          updateHandler(groupId)
        })
        .catch(function (error) {
          console.log(error);
        });
        this.props.onClose(groupId);

        console.log("gonna share note with groupId " + groupId + " and the note is " + this.props.noteId);
    };

    onCloseGroup = () => {
      this.setState({
        openGroup: false
      })
    }

    onOpenGroup = () => {
      this.setState({
        openGroup: true
      })
    }

    createGroup = (userId) => {
      console.log("currentUserId in create function ", this.props.currentUserId)
      axios.post('http://localhost:8080/groups', {
        groupName: this.state.groupName,
        userId: this.props.currentUserId
      })
      .then((resp) => {
        console.log(resp)
        this.onCloseGroup()
        this.handleClose()
        console.log("get groups in share dialog js ", this.props.getGroups)
        this.props.getGroups()
      })
      .catch(err => console.log(err))
    }

    // onChangeGroup = (e) => {
    //   groupName: e.target.groupName
    // }


    render() {
        const {currentUserId} = this.props
        const { classes, noteId, onClose, selectedValue, ...other } = this.props;
        const { updateHandler } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Share this note with:</DialogTitle>
                <div>
                    <List>
                      <ListItem button onClick={this.onOpenGroup}>
                          <ListItemAvatar>
                              <Avatar>
                                  <AddIcon />
                              </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Create Group" />
                      </ListItem>
                      {this.props.groups.map(group => (
                          <ListItem button onClick={() => this.shareNoteInGroup(group.groupId, this.props.currentUserId)} key={group.groupName}>
                              <ListItemAvatar style={{backgroundColor: '#ffc601'}}>
                                  <Avatar className={classes.avatar}>
                                      <GroupIcon />
                                  </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={group.groupName} />
                          </ListItem>
                      ))}
                    </List>
                </div>
                  <div className="create-group">
                  <Dialog
                    open={this.state.openGroup}
                    onClose={() => this.onCloseGroup()}
                    >
                    <DialogTitle id="alert-dialog-title">{"Add New Group"}</DialogTitle>
                    <DialogContent>
                      <div className="newDocDiv">
                        <div>
                          <TextField id="newDocumentName"
                            onChange={(e) => this.setState({groupName: e.target.value})}
                            type="text" name="newDocumentName"
                            label="Create New Group"
                            value={this.state.groupName}
                            className="login-input"
                            placeholder="New Group Name"/>
                        </div>
                        <div className="newdocButton">
                            <Button className="login-btn btnStyleCustom" onClick={this.createGroup}>
                              Create New Group
                            </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  </div>
            </Dialog>
        );
    }
}

ShareDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(ShareDialog);

class ShareModal extends React.Component {
    state = {
        open: false,
        // selectedValue: emails[1],
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

    render() {
        const { updateHandler } = this.props;
        console.log("current user id in share modal ", this.props.currentUserId)
        return (
            <div>
                {/*<Typography variant="subtitle1">Selected: {this.state.selectedValue}</Typography>*/}
                {/*<br />*/}
                <IconButton aria-label="Share" onClick={this.handleClickOpen}>
                    <ShareIcon />
                </IconButton>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                    {/*Open simple dialog*/}
                {/*</Button>*/}
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                    groups={this.props.groups}
                    noteId={this.props.noteId}
                    updateHandler={updateHandler}
                    currentUserId={this.props.currentUserId}
                    getGroups = {this.props.getGroups}
                />
            </div>
        );
    }
}

export default ShareModal;
