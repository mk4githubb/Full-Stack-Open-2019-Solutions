
export const ac_setNotification_Text =  (text) => {
    return async dispatch => {
        dispatch({
            type: 'setNotificationText',
            data:text
        });

        setTimeout(() => dispatch({
            type: 'setNotificationText',
            data: null
        }), 2000);
    }
};


const notificationTextReducer = (state = null, action) => {
    switch (action.type) {
        case 'setNotificationText':
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