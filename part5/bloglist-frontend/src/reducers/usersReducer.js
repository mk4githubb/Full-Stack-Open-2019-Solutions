
const usersReducer = (state=[], action)=>{

    switch (action.type) {
        case 'initUsers':
            state=action.data;
            return state;
        default:
            return state;
    }
};

export const ac_initUsers = (db) => {
    return async dispatch => {
        try {
            const received = await db.getAll();
            const users = received.data;
            dispatch ({
                type:'initUsers',
                data: users
            })
        }
        catch (exception) {
            console.log('Error Getting users');
            return
        }
    }
};

export default usersReducer;