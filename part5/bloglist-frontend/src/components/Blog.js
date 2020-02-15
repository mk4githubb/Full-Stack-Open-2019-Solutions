import React from 'react'
import {connect} from 'react-redux'
import {ac_setNotification_Text} from "../reducers/notificationTextReducer";
import  {ac_likeBlog, ac_deleteBlog} from "../reducers/blogsReducer";

const Blog = (props) => {

    const likeHandler = async () => props.likeBlog(props.db, props.blog);

    const deleteHandler = async (event) => {
        const config = {
            headers: {
                Authorization: `bearer ${props.loggedInUser.webToken}`
            }
        };

        props.deleteBlog(props.db, config, props.blog.id);
    };

    return (
        <div >
            <h3>{props.blog.title}</h3>
            <p>{props.blog.text}</p>
            <div>
                <div>
                    <span><button onClick={likeHandler}>Like</button></span>
                    <span>{props.blog.likes} Likes </span>
                </div>
                <div>
                    <span>by {props.blog.author.username}</span>
                    {props.loggedInUser && props.loggedInUser.username === props.blog.author.username ? <span><button
                        onClick={(event) => deleteHandler(event, props.blog.id)}>Delete</button></span> : null}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state)=>{
    return{
        blogs:state.blogs,
        loggedInUser:state.loggedInUser,
        notificationText:state.notificationText
    }
};

const mapDispatchToProps = (dispatch)=> {
    return{
        setNotificationText:(data) => dispatch(ac_setNotification_Text(data)),
        likeBlog: (db, blog) => dispatch(ac_likeBlog(db,blog)),
        deleteBlog: (db, config, id) => dispatch(ac_deleteBlog(db, config,id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);