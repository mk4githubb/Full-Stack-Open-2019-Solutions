
export const ac_setSearch_Text =  (text) => {
    return async dispatch => {
        dispatch({
            type: 'setText',
            data:text
        });
    }
};


const searchTextReducer = (state = null, action) => {
    switch (action.type) {
        case 'setText':
            if(action.data == ''){
                return state = null;
            }
            state = action.data;
            return state;

        case 'removeText':
            state = null;
            return state;

        default:
            return state;
    }
};

export default searchTextReducer;