import React from 'react'
import {Card, Segment} from "semantic-ui-react";
import OneBlog from "./OneBlog";
import {ac_setNotification_Text} from "../reducers/notificationTextReducer";
import {ac_deleteBlog, ac_likeBlog} from "../reducers/blogsReducer";
import {connect} from "react-redux";


const BlogsContainer = (props)=> {

    let blogs = props.blogs;
    if(props.searchText != null ){
          blogs = props.blogs.filter( i => i.text.includes(props.searchText));
    }
    return(
        <Segment>
            <Card.Group itemsPerRow={2}>
                {blogs.map(i => <OneBlog db={props.db} blog={i}/>)}
            </Card.Group>
        </Segment>

    )
};

const mapStateToProps = (state)=>{
    return{
        blogs:state.blogs,
        searchText:state.searchText
    }
};

// const mapDispatchToProps = (dispatch)=> {
//     return{
//         setNotificationText:(data) => dispatch(ac_setNotification_Text(data)),
//         likeBlog: (db, blog) => dispatch(ac_likeBlog(db,blog)),
//         deleteBlog: (db, config, id) => dispatch(ac_deleteBlog(db, config,id))
//     }
// };

export default connect(mapStateToProps, null)(BlogsContainer);

