import React from 'react'
import {actionCreatorUpVote} from "../reducers/anecdoteReducer";

const AnecdotesList = ({store}) => {
    const anecdotes = store.getState();

    const vote = (id) => {
        store.dispatch(actionCreatorUpVote(id));
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