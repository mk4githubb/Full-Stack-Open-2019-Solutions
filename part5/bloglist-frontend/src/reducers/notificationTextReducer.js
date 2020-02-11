
export const ac_setNotification_Text =  (text) => {
    return async dispatch => {
        dispatch({
            type: 'setText',
            data:text
        });

        setTimeout(() => dispatch({
            type: 'setText',
            data:null
        }), 2000);
    }
};


const notificationTextReducer = (state = null, action) => {
    switch (action.type) {
        case 'setText':
            state = action.data;
            return state;

        case 'removeText':
            state = null;
            return state;

        default:
            return state
    }
};

export default notificationTextReducer;