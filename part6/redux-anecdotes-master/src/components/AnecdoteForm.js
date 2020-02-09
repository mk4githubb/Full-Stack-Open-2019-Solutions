import React from 'react'
import {actionCreatorNewNote} from "../reducers/anecdoteReducer";
import {notificationCreator} from "../reducers/notificationsReducer";
import {connect} from 'react-redux'

const NewAnecdoteForm = (props) => {

    const addAnecdoteHandler = (event) => {
        event.preventDefault();

        if (!event.target.anecdoteBody.value) {
            return;
        }

        props.actionCreatorNewNote(event.target.anecdoteBody.value);
        props.notificationCreator('New Anecdote Added',5000);
        event.target.anecdoteBody.value = '';
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdoteHandler}>
                <div><input name={'anecdoteBody'}/></div>
                <button>create</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state)=> {
    return {
        anecdotes: state.anecdotes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        notificationCreator: (text,time) => dispatch(notificationCreator(text,time)),
        actionCreatorNewNote: (data) => dispatch(actionCreatorNewNote(data))
    }};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnecdoteForm);