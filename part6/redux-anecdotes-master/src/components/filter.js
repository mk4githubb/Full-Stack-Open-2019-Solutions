import React from 'react'
import {actionCreatorNewValueInput} from "../reducers/filterReducer";

const Filter = ({store}) => {

    const filterHandler = (event) => {
        event.preventDefault();
        store.dispatch(actionCreatorNewValueInput(event.target.value));
    };

    return(
        <form >
            <input type={'text'} onChange={filterHandler} placeholder={'search...'}/>
        </form>
    )
};

export default Filter;