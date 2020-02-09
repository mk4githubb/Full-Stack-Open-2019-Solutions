import {post} from "../Service";

const reducer =  (state = [], action) => {
    switch (action.type) {
        case 'vote':
            const found = state.find(i => i.id === action.id);
            found.votes = found.votes + 1;
            state.sort((a, b) => b.votes - a.votes);
            return [...state];

        case 'addAnecdote':
            const toAddAnecdote = newAnecdoteHandler(action.body);
             post(toAddAnecdote);
            const newState = [...state, toAddAnecdote];
            return newState.sort((a, b) => b.votes - a.votes);
        case 'initAnecdotes':
            return action.anecdotes.sort((a, b) => b.votes - a.votes);
        default:
            return state
    }
};

const getId = () => (100000 * Math.random()).toFixed(0);

const newAnecdoteHandler = (body) => {
    return {
        content: body,
        id: getId(),
        votes: 0
    }
};

export const actionCreatorUpVote = (id) => {
    return {
        type: 'vote',
        id: id
    }
};

export const actionCreatorNewNote = (data) => {
    return {
        type: 'addAnecdote',
        body: data
    }
};

export const actionCreatorInitAnecdotes = (anecdotes) => {
  return {
      type:'initAnecdotes',
      anecdotes: anecdotes
  }
};

export default reducer