import React from 'react'
import {actionCreatorNewNote} from "../reducers/anecdoteReducer";
import {notificationCreator} from "../reducers/notificationsReducer";

const NewAnecdoteForm = ({store}) => {

    const addAnecdoteHandler = (event) => {
        event.preventDefault();

        if (!event.target.anecdoteBody.value) {
            return;
        }

        store.dispatch(actionCreatorNewNote(event.target.anecdoteBody.value));
        store.dispatch(notificationCreator('New Anecdote Added'));
        setTimeout(()=>store.dispatch(notificationCreator(null)), 2000);

        event.target.anecdoteBody.value = '';
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdoteHandler}>
                <div><input name={'anecdoteBody'}/></div>
                <button>create</button>
            </form>
        </div>
    );
};

export default NewAnecdoteForm;