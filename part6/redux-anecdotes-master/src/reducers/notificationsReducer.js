
export const notificationCreator = (text, time) => {
    return dispatch => {
        dispatch({
            type:'setNotification',
            notification: text
        });
        setTimeout(()=>dispatch({
            type:'setNotification',
            notification: null
        }), time);
    }
};


const notificationReducer = (notificationText = null, action) => {
    switch (action.type) {
        case 'setNotification':
            notificationText = action.notification;
            return notificationText;
        default:
            return notificationText;
    }
};

export default notificationReducer;