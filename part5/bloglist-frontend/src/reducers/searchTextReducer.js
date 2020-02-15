
export const ac_setSearch_Text =  (text) => {
    return async dispatch => {
        dispatch({
            type: 'setSearchText',
            data:text
        });
    }
};


const searchTextReducer = (state = null, action) => {
    switch (action.type) {
        case 'setSearchText':
            if(action.data == ''){
                return state = null;
            }
            state = action.data;
            return state;

        case 'removeSearchText':
            state = null;
            return state;

        default:
            return state;
    }
};

export default searchTextReducer;