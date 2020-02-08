import React from 'react'
import {actionCreatorNewValueInput} from "../reducers/filterReducer";
import {connect} from "react-redux";

const Filter = (props) => {

    const filterHandler = (event) => {
        event.preventDefault();
        props.actionCreatorNewValueInput(event.target.value);
    };

    return(
        <form >
            <input type={'text'} onChange={filterHandler} placeholder={'search...'}/>
        </form>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreatorNewValueInput: (text) => dispatch(actionCreatorNewValueInput(text))
    }};

export default connect(null, mapDispatchToProps)(Filter);