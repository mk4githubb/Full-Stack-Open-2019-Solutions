import React from 'react';
import NewAnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdotesList";
import Notification from "./components/Notification";
import Filter from "./components/filter";


const App = (props) => {
    const store = props.store;

    return (
        <div>
            <Notification store={store}/>
            <h2>Anecdotes</h2>
            <Filter store={store}/>
            <SearchHandler store={store}/>

            <div style={{marginTop: '10px'}}>
                <NewAnecdoteForm store={store}/>
                <AnecdotesList store={store}/>
            </div>

        </div>
    )
};

const SearchHandler = ({store}) => {
    const toFind = store.getState().filterText == null ? null : store.getState().filterText.toLowerCase();
    const filtered = store.getState().anecdotes.filter(i => i.content.toLowerCase().includes(toFind));

    return filtered.map(i => <OneResult anecdote={i}/>);
};

const OneResult = ({anecdote})=> {
    return <li>{anecdote.content}</li>
};

export default App