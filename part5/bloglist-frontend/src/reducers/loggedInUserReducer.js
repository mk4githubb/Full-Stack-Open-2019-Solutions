import React from 'react'

const loggedInUseReducer = (state = null, action) => {
    switch (action.type) {
        case 'setUser':
            state = action.data;
            return state;

        case 'logout':
            window.localStorage.clear();
            state = null;
            return state;

        default:
            return state
    }
};


export const ac_setLoggedInUserFromLS = (data) => {
    return {
        type: 'setUser',
        data: data
    }
};

export const ac_logout = () => {
    return {
        type: 'logout',
    }
};

export const ac_login = (db, data) => {
    return async dispatch => {
        try {
            const returnedObject = await db.post(data);
            const returnResultData = returnedObject.data;
            window.localStorage.setItem('token', JSON.stringify(returnResultData));

            dispatch({
                type: 'setUser',
                data: returnedObject
            });

            dispatch({
                type: 'setNotificationText',
                data: 'Login Successful'
            });

        } catch (exception) {
            return dispatch => dispatch({
                type: 'setNotificationText',
                data: 'Error Logging in'
            })
        }
    }
};


export const ac_createUser = (db, newUser) => {
    return async dispatch => {
        try {
            await db.post(newUser);
            dispatch({
                type: 'setNotificationText',
                data: 'User Created Please Log in'
            });
            console.log('user Created')
        } catch (exception) {
            dispatch({
                type: 'setNotificationText',
                data: 'Error Creating User'
            })
        }
    }
};

export default loggedInUseReducer;