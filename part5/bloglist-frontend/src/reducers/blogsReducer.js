
const blogsReducer = (state = [], action) => {

    switch (action.type) {
        case 'initBlogs':
            state = action.data;
            return state;
        case 'addBlog':
            state = [...state, action.data]
            return state;
        case 'likeBlog':
            const found = state.find(i => i.id === action.data);
            found.likes = found.likes + 1;
            return [...state];
        case 'deleteBlog':
            return state.filter(i => i.id !== action.data);
        default:
            return state;
    }
};

export const ac_InitBlogs =  (db)=> {
    return async (dispatch) => {
        try {
            const received = await db.getAll();
            const blogs = received.data;
            dispatch ({
                type:'initBlogs',
                data: blogs
            })
        }
        catch (exception) {
            console.log('Error Getting Blogs');
            return
        }
    }
};

export const ac_createBlog = (db, config, newBlog)=> {

    return async dispatch => {
        try {
            const receivedData = await db.post(newBlog, config);

            dispatch({
                    type:'addBlog',
                    data: receivedData.data
                });
        } catch (exception) {
            dispatch({
                type:'setNotification',
                data: 'Error adding blog'
            });
        }
    }
};


export const ac_likeBlog =  (db, blog)=> {

    return async dispatch => {
        try{
            const newBlog = {...blog, likes: blog.likes + 1};
            db.put(blog.id, newBlog);

            dispatch({
                type:'likeBlog',
                data: blog.id
            })

        } catch (exception) {
            console.log('Error in Put Request')
        }
    }
};

export const ac_deleteBlog = (db, config, id)=>{
    return async dispatch => {
        try {
            await db.del(id, config);

            dispatch({
                type:'deleteBlog',
                data: id
            })
        }catch (exception) {
           console.log('Error Deleting a blog')
        }
    }
};
export default blogsReducer;