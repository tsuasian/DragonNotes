import React from 'react'
import '../css/note.css'
import {Card, CardContent, CardHeader, Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import CardActions from "@material-ui/core/CardActions/CardActions";
import ShareModal from "../ShareDialog/ShareDialog"

export const Note = ({noteText="-", postedBy= "-", timePosted="-", edited, groups}) => {
    return (
        <Card className={'noteCard'}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Note" style={{backgroundColor: '#f44336'}} className={'red'}>
                        {postedBy}
                    </Avatar>
                }
                action={
                    <IconButton>
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

        </Card>
    )
};
