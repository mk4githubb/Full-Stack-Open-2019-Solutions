const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
};

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

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'vote':
            const found = state.find(i => i.id === action.id);
            found.votes = found.votes + 1;
            state.sort((a, b) => b.votes - a.votes);
            return [...state];

        case 'addAnecdote':
            const newState = [...state, newAnecdoteHandler(action.body)];
            return newState.sort((a, b) => b.votes - a.votes);

        default:
            return state
    }
};

export default reducer