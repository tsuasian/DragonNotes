import React from 'react'
import PropTypes from 'prop-types'
import { Note } from '../Note/Note'
import axios from 'axios'

class NoteList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notes: [],
        };
        this.getNotesInGroup = this.getNotesInGroup.bind(this);
    }

    state = {
        loading: false

    };

    getNotesInGroup(groupId) {
        fetch(
            "http://localhost:8080/groups/" + groupId
        ).then(
            notes => notes.json()
        ).then(notes => this.setState({notes}));
    }

    render() {
        const { notes } = this.props;
        const { groups } = this.props;
        const { updateHandler } = this.props;
        const { userName } = this.props;
        return (
            <div>
                {this.state.loading
                    ? "loading..."
                    : <div>
                        {notes.map(
                            (note, i) =>
                                <Note
                                    key={i}
                                    noteText={note.entryText}
                                    postedBy={note.postedBy}
                                    timePosted={note.timePosted}
                                    noteId={note.noteId}
                                    edited={this.state.open}
                                    updateHandler ={updateHandler}
                                    groups={groups}
                                    userName={note.firstName + " "  + note.lastName}/>
                        )}
                    </div>
                }
            </div>
        )
    }
}

export default NoteList
