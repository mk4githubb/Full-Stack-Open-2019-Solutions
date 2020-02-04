
const initialState = {
  good:0,
  bad:0,
  neutral:0
};

const reducer = (state=initialState, action) => {

    switch (action.type.toLowerCase()) {
        case 'good':
            return {...state, good: state.good+1};

        case 'bad':
            return {...state, bad: state.bad+1};

        case 'neutral':
            return {...state, neutral: state.neutral+1};

        case 'reset':
            return {
            good:0,
            bad:0,
            neutral:0 };
        default:
            return state
    }

    return state;
};

export default reducer;