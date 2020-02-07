import React from 'react'
import {actionCreatorUpVote} from "../reducers/anecdoteReducer";
import {notificationCreator} from "../reducers/notificationsReducer";

const AnecdotesList = ({store}) => {
    const anecdotes = store.getState().anecdotes;

    const vote = (id) => {
        store.dispatch(actionCreatorUpVote(id));
        store.dispatch(notificationCreator(`You up voted -  ${anecdotes.find(i => i.id === id).content}`));
        setTimeout(() =>store.dispatch(notificationCreator(null)), 2000);
    };

    const list = anecdotes.map(
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

export default AnecdotesList;