import React from 'react';
import NewAnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdotesList";
import Notification from "./components/Notification";
import Filter from "./components/filter";
import {connect} from "react-redux";
import SearchHandler from "./components/SearchHandler";


const App = () => {

    return (
        <div>
            <Notification/>
            <h2>Anecdotes</h2>
            <Filter />
            <SearchHandler />

            <div style={{marginTop: '10px'}}>
                <NewAnecdoteForm />
                <AnecdotesList />
            </div>

        </div>
    )
};

const mapStateToProps = (state)=> {
    return {
        filterText: state.filterText,
        anecdotes: state.anecdotes
    }
};

export default connect(mapStateToProps)(App);