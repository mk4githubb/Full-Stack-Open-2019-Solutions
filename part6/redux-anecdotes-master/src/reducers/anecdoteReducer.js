import {post, put} from "../Service";

const reducer =  (state = [], action) => {
    switch (action.type) {
        case 'vote':
            const found = state.find(i => i.id === action.id);
            found.votes = found.votes + 1;
            state.sort((a, b) => b.votes - a.votes);
            return [...state];

        case 'addAnecdote':
            const newState = [...state, action.body];
            return newState.sort((a, b) => b.votes - a.votes);
        case 'initAnecdotes':
            return action.anecdotes.sort((a, b) => b.votes - a.votes);
        default:
            return state
    }
};

const getId = () => (100000 * Math.random()).toFixed(0);


export const actionCreatorUpVote = (anecdote) => {

    return dispatch => {

        put(anecdote.id, {...anecdote, votes:anecdote.votes+1});
        dispatch({
            type: 'vote',
            id: anecdote.id
        })
    }
};

export const actionCreatorNewNote = (data) => {
    return async (dispatch) => {

        const newAnecdote = { content:data,
            id:getId(),
            votes: 0
        };

        const received = await post(newAnecdote);

        dispatch({
            type: 'addAnecdote',
            body: received
        })
    }
};

export const actionCreatorInitAnecdotes = (anecdotes) => {
  return {
      type:'initAnecdotes',
      anecdotes: anecdotes
  }
};

export default reducer