import React, {Fragment} from 'react'
import NoteList from "../NoteList/NoteList";
import TextArea from "../TextArea/TextArea";

class NoteArea extends React.Component {

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
        const { groups } = this.props;
        const { updateHandler } = this.props;
        return (
            <Fragment>
                <TextArea updateHandler={updateHandler}/>
                <NoteList notes={notes} updateHandler={updateHandler} groups={groups}/>
            </Fragment>
        )
    }
}


export default NoteArea
