import React from 'react'
import {actionCreatorNewNote, actionCreatorUpVote} from "../reducers/anecdoteReducer";
import {connect} from 'react-redux'
import {notificationCreator} from "../reducers/notificationsReducer";

const AnecdotesList = (props) => {

    const vote = (id) => {
        props.actionCreatorUpVote(id);
        props.notificationCreator(`You up voted -  ${props.anecdotes.find(i => i.id === id).content}`);
        setTimeout(() => props.notificationCreator(null), 2000);
    };

    const list = props.anecdotes.map(
        anecdote => <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    );

    return (
        <div>
            {list}
        </div>
    )

};

const mapStateToProps = (state)=> {
    return {
        anecdotes: state.anecdotes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreatorUpVote: (id) => dispatch(actionCreatorUpVote(id)),
        notificationCreator: (text) => dispatch(notificationCreator(text))
    }};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdotesList);