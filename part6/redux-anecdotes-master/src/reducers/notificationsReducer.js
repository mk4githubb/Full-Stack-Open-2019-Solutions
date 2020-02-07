
export const notificationCreator = (text) => {
    return {
        type:'setNotification',
        notification: text
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