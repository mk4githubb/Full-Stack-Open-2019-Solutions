import React from 'react';
import {actionCreatorNewNote, actionCreatorUpVote} from "./reducers/anecdoteReducer";

const App = (props) => {
    const store = props.store;
    const anecdotes = store.getState();

    const vote = (id) => {
        store.dispatch(actionCreatorUpVote(id));
    };

    const addAnecdoteHandler = (event) => {
        event.preventDefault();

        if (!event.target.anecdoteBody.value) {
            return;
        }

        store.dispatch(actionCreatorNewNote(event.target.anecdoteBody.value));

        event.target.anecdoteBody.value = '';
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={addAnecdoteHandler}>
                <div><input name={'anecdoteBody'}/></div>
                <button>create</button>
            </form>
        </div>
    )
};

export default App