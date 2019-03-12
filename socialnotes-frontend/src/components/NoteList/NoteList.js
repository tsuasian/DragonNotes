import React from 'react'
import PropTypes from 'prop-types'
import { Note } from '../Note/Note'

class NoteList extends React.Component {

    constructor({notes}){
        super({notes});

        this.state = {
            notes: {notes},
            loading: false
        };
    }

    // componentWillReceiveProps(nextProps, thing){
    //     console.log("got the props!!!!");
    //     if(nextProps.notes!==this.props.notes){
    //         //Perform some operation
    //         this.setState({notes: nextProps.notes });
    //         // this.classMethod();
    //     }
    // }

    static getDerivedStateFromProps(nextProps, prevState){
        // console.log("new props!");


        if(nextProps.notes!==prevState.notes){
            console.log("new in the list!!!!");
            console.log(nextProps.notes);
            console.log(prevState.notes);
            return { notes: nextProps.notes};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState, thing) {
        if(prevProps.notes!==this.props.notes){
            console.log("sssss!!");
            //Perform some operation here
            this.setState({notes: this.props.notes});
            // this.classMethod();
        }
    }

    render() {

        let notes = this.state.notes;
        // const { notes } = this.props;
        // console.log(this.state.notes);
        // console.log("these notes: " + this.props.notes);
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
                                    edited={this.state.open}/>
                        )}
                    </div>
                }
            </div>
        )
    }
}

Note.propTypes = {
    noteText: PropTypes.string,
    postedBy: PropTypes.number,
    datePosted: PropTypes.string,
    edited: PropTypes.bool
};

export default NoteList