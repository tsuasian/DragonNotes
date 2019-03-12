import React, {Fragment} from 'react'
import NoteList from "../NoteList/NoteList";
import TextField from '@material-ui/core/TextField';
import TextArea from "../TextArea/TextArea";

class NoteArea extends React.Component {

    // constructor(props){
    //     super(props);
    //
    //     state = {
    //         notes: this.props.notes,
    //         loading: false
    //     };
    // }

    state = {
        notes: [],
        loading: false
    };

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.notes!==prevState.notes){
            return { notes: nextProps.notes};
        }
        else return null;
    }


    render() {

        const { notes } = this.props;
        const { updateHandler } = this.props;
        return (
            <Fragment>
                <TextArea updateHandler={updateHandler}/>
            <div>
                <NoteList notes={notes} updateHandler={updateHandler}/>
            </div>
            </Fragment>
        )
    }
}


export default NoteArea
