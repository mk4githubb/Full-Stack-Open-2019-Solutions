import React from 'react'
import { actionCreatorUpVote} from "../reducers/anecdoteReducer";
import {connect} from 'react-redux'
import {notificationCreator} from "../reducers/notificationsReducer";

const AnecdotesList = (props) => {

    const vote = anecdote => {
        props.actionCreatorUpVote(anecdote);
        props.notificationCreator(`You up voted -  ${props.anecdotes.find(i => i.id === anecdote.id).content}`,2000);
    };

    const list = props.anecdotes.map(
        anecdote => <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
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
        actionCreatorUpVote: (anecdote) => dispatch(actionCreatorUpVote(anecdote)),
        notificationCreator: (text, time) => dispatch(notificationCreator(text, time))
    }};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdotesList);