import React from 'react'
import {connect} from 'react-redux'

const SearchHandler = ({filterText, anecdotes}) => {
    const toFind = filterText == null ? null : filterText.toLowerCase();
    const filtered = anecdotes.filter(i => i.content.toLowerCase().includes(toFind));

    return filtered.map(i => <OneResult anecdote={i}/>);
};

const OneResult = ({anecdote}) => {
    return <li>{anecdote.content}</li>
};

const mapStateToProps = (state) => {
    return {
        filterText: state.filterText,
        anecdotes: state.anecdotes
    }
};

export default connect(mapStateToProps)(SearchHandler);
