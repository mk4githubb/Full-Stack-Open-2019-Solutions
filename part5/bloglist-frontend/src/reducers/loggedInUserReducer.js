
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
        type:'setUser',
        data: data
    }
};

export const ac_logout = () => {
    return {
        type:'logout',
    }
};

export const ac_login = (db, data) => {
    return async dispatch => {
        try {
            const returnedObject = await db.post(data);
            const returnResultData = returnedObject.data;
            window.localStorage.setItem('token', JSON.stringify(returnResultData));
            // update(returnResultData, syncer);

            dispatch({
                type: 'setUser',
                data: returnedObject
            });

            dispatch({
                type: 'setNotification',
                data: 'Login Successful'
            });
        } catch (exception) {
            return dispatch => dispatch({
                type: 'setNotification',
                data: 'Error Logging in'
            })
        }
    }
};


export const ac_createUser =  (db, newUser) => {
    return async dispatch =>{
        try {
            const createdUser = await db.post(newUser);
            return dispatch => dispatch({
                type: 'setNotification',
                data: 'User Created Please Log in'
            })

        } catch (exception) {
            dispatch({
                type: 'setNotification',
                data: 'Error Creating User'
            })
        }
    }
};

export default loggedInUseReducer;