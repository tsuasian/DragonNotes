import React from 'react'
import '../css/note.css'
import {Card, CardContent, CardHeader, Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from "@material-ui/core/CardActions/CardActions";
import ShareModal from "../ShareDialog/ShareDialog"
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

export class Note extends React.Component {
    state = {
        anchorEl: null,
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    renderTimePosted = (timePosted) => {

    };


    render() {

        const { noteText } = this.props;
        const { groups } = this.props;
        const { postedBy } = this.props;
        const { timePosted } = this.props;
        const { edited } = this.props;

        const { anchorEl } = this.state;
        // const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Edit</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Delete</MenuItem>
            </Menu>
        );

        return (
            <Card className={'noteCard'}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Note" style={{backgroundColor: '#f44336'}} className={'red'}>
                            {postedBy}
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
                    title={noteText.split(' ')[0]}
                    subheader={timePosted}
                />
                <CardContent>
                    <p>{noteText}</p>
                    <p>{edited ? 'edited': ''}</p>
                </CardContent>

                <CardActions className={'actions'} disableActionSpacing>
                    {/*<IconButton aria-label="Share">*/}
                    {/*<ShareIcon />*/}
                    {/*</IconButton>*/}
                    <ShareModal groups={groups}/>
                </CardActions>
                {renderMenu}
            </Card>

        )

    }
}