
export const actionCreatorNewValueInput = (text) => {
    return {
        type: 'setFilteringText',
        text:text
    }
};

const filterReducer = (state = null, action)=> {
        switch (action.type) {
            case 'setFilteringText':
                state = action.text==''? null : action.text;
                return state;
            default:
                return state;
        }
};

export default filterReducer;