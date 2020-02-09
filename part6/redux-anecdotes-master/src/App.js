import React , {useEffect}from 'react';
import NewAnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdotesList";
import Notification from "./components/Notification";
import Filter from "./components/filter";
import {connect} from "react-redux";
import SearchHandler from "./components/SearchHandler";
import {actionCreatorInitAnecdotes} from "./reducers/anecdoteReducer";
import {getAll} from "./Service";


const App =  (props) => {

    useEffect( () => {
        getAll().then(response => props.initAnecdotes(response));
    },[] );

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

const mapDispatchToProps = (dispatch) => {
    return {
        initAnecdotes: (anecdotes) => dispatch(actionCreatorInitAnecdotes(anecdotes))
    }
};

export default connect(null, mapDispatchToProps)(App);