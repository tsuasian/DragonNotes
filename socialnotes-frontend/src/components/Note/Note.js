import React from 'react'
import '../css/note.css'
import {Card, CardContent, CardHeader, Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from "@material-ui/core/CardActions/CardActions";
import ShareModal from "../ShareDialog/ShareDialog"
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import theme from '../../theme/theme';
const axios = require('axios');

export class Note extends React.Component {
    state = {
        anchorEl: null
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    deleteNote = (groupId) => {
        const { noteId } = this.props;
        const { updateHandler } = this.props;
        const { getGroups } = this.props;
        const { currentGroup } = this.props

        // We should really send a token to validate this deletion
        // e.g. const token = localStorage.getItem('sessionToken');
        const deleteEndpoint = `http://localhost:8080/notes/delete/`;
        axios.post(deleteEndpoint, {
            noteId: noteId,
        })
        .then(function (response) {
          console.log("delete response ", response);
          console.log("curent group prop ", currentGroup)
          updateHandler(groupId); // refresh the list
        })
        .catch(function (error) {
          console.log(error);
        });
        this.handleMenuClose();
    };

    //https://stackoverflow.com/questions/27012854/change-iso-date-string-to-date-object-javascript
    renderTimePosted = (timePosted) => {
        let digits = timePosted.split(/\D+/);
        let d = new Date(Date.UTC(digits[0], --digits[1], digits[2], digits[3], digits[4], digits[5], digits[6]));
        const date = d.toDateString().slice(0, -5); // Date minus year
        const time = d.toTimeString().slice(0, 5); // Time minus seconds and GMT info
        return `${date}, ${time}`;
    };

    render() {

        const { noteText } = this.props;
        const { groups } = this.props;
        const { postedBy } = this.props;
        const { timePosted } = this.props;
        const { edited } = this.props;
        const { anchorEl } = this.state;
        const { noteId } = this.props;
        const { userName} = this.props;
        // const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const { updateHandler } = this.props;

        const {currentUserId} = this.props
        console.log("current user Id in notejs ", currentUserId)
        console.log("props user id in note js ", this.props.currentUserId)
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={() => this.deleteNote(this.props.currentGroup)}>Delete</MenuItem>
            </Menu>
        );

        return (
            <Card className={'noteCard'}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Note" style={{backgroundColor: theme.palette.secondary["A400"]}} className={'red'}>
                            {userName.split(' ')[0].slice(0,1) + userName.split(' ')[1].slice(0,1) }
                        </Avatar>
                    }
                    action={
                        <IconButton
                            // aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={userName}
                    subheader={this.renderTimePosted(timePosted)}
                />
                <CardContent>
                    <p>{noteText}</p>
                    <p>{edited ? 'edited': ''}</p>
                </CardContent>

                <CardActions className={'actions'} disableActionSpacing>
                    {/*<IconButton aria-label="Share">*/}
                    {/*<ShareIcon />*/}
                    {/*</IconButton>*/}
                    <ShareModal groups={groups} noteId={noteId} updateHandler={updateHandler} currentGroup = {this.props.currentGroup} currentUserId={this.props.currentUserId}  getGroups={this.props.getGroups}/>

                </CardActions>
                {renderMenu}
            </Card>

        )

    }
}
