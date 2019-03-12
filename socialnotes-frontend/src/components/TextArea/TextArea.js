import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";

const styles = theme => ({
    //This is the container that holds the text area
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 50% 1fr',
    },
    textField: {
        gridColumnStart: '2',
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    }
});


// https://material-ui.com/demos/text-fields/
class TextArea extends React.Component {

    constructor({updateHandler}){
        super({updateHandler});

        this.state = {
            inputBoxText: '',
            updateHandler: updateHandler
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit(event) {
        // Prevent default form submission behaviour, which goes to a new page
        // https://reactjs.org/docs/forms.html
        event.preventDefault();

        axios.post("http://localhost:8080/notes", {
            postText: this.state.inputBoxText,
            userId: '1'
        }).then((data) => {
                console.log(data)
                this.state.updateHandler()
                this.setState({ inputBoxText: '' })
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const { updateHandler } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                <TextField
                    id="outlined-textarea"
                    label="Note"
                    placeholder="What are you thinking?"
                    multiline={true}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    rows={5}
                    rowsMax={20}
                    value={this.state.inputBoxText}
                    onChange={this.handleChange('inputBoxText')}
                />

                <div>
                <Fab color="primary" aria-label="Add" className={classes.fab} type="submit" value="Submit">
                    <AddIcon />
                </Fab>
                </div>

            </form>
        );
    }
}


TextArea.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextArea);
