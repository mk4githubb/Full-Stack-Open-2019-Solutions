import React from 'react';
import {actionCreatorUpVote} from "./reducers/anecdoteReducer";
import NewAnecdoteForm from "./components/AnecdoteForm";

const App = (props) => {
    const store = props.store;
    const anecdotes = store.getState();

    const vote = (id) => {
        store.dispatch(actionCreatorUpVote(id));
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
            <NewAnecdoteForm store={store}/>
        </div>
    )
};

export default App