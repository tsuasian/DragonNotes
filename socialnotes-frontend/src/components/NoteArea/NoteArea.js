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

    // //Get notes for the logged in user
    // componentDidMount() {
    //     this.setState((state, props) => ({
    //        notes: props.notes
    //     }))
    // }

    static getDerivedStateFromProps(nextProps, prevState){
        // console.log("new props!");


        if(nextProps.notes!==prevState.notes){
            // console.log("new!!!!");
            // console.log(nextProps.notes);
            // console.log(prevState.notes);
            return { notes: nextProps.notes};
        }
        else return null;
    }

    componentDidUpdate() {
        // console.log("The component just updated")
    }

    render() {
        // console.log("*");
        // console.log(this.state.notes);
        // console.log("&");
        // console.log(this.props.notes);
        // console.log("&");

        const { notes } = this.props;
        const { updateHandler } = this.props;
        return (
            <Fragment>
                <TextArea updateHandler={updateHandler}/>
            <div>
                <NoteList notes={notes}/>
            </div>
            </Fragment>
        )
    }
}


export default NoteArea