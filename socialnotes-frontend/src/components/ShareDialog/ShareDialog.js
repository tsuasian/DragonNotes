import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import ShareIcon from '@material-ui/icons/Share';
import GroupIcon from '@material-ui/icons/Group';
import {IconButton} from "@material-ui/core";
const axios = require('axios');
const styles = require('../../theme/theme');

class ShareDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    shareNoteInGroup = groupId => {
        const shareEndpoint = `http://localhost:8080/groups/notes/`;
        axios.post(shareEndpoint, {
            noteId: this.props.noteId,
            groupId: groupId
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.onClose(groupId);
        this.props.updateHandler(groupId);
        console.log("gonna share note with groupId " + groupId + " and the note is " + this.props.noteId);
    };



    render() {
        const { classes, noteId, onClose, selectedValue, ...other } = this.props;

        const { updateHandler } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Share this note with:</DialogTitle>
                <div>
                    <List>
                        {this.props.groups.map(group => (
                            <ListItem button onClick={() => this.shareNoteInGroup(group.groupId)} key={group.groupName}>
                                <ListItemAvatar style={{backgroundColor: '#ffc601'}}>
                                    <Avatar className={classes.avatar}>
                                        <GroupIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={group.groupName} />
                            </ListItem>
                        ))}

                        <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="add account" />
                        </ListItem>
                    </List>
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
                />
            </div>
        );
    }
}

export default ShareModal;