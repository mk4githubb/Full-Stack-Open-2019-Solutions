import React from 'react';
import NewAnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdotesList";

const App = (props) => {
    const store = props.store;

    return (
        <div>
            <h2>Anecdotes</h2>
            <NewAnecdoteForm store={store}/>
            <AnecdotesList store={store}/>
        </div>
    )
};

export default App