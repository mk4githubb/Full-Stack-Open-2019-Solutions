import React from 'react'
import {Button, Card, Grid, Icon, Image, Label, GridRow, Segment} from "semantic-ui-react";
import Navbar from "../Navbar";
import {connect} from 'react-redux'
import {ac_setNotification_Text} from "../../reducers/notificationTextReducer";
import {ac_deleteBlog, ac_likeBlog} from "../../reducers/blogsReducer";
import {Link} from "react-router-dom";
import useResource from "../../hooks/useResources";
import {DeleteButton} from "../OneBlog";

const OneBlogURL = (props) => {

    if (!props.blog){
        return null;
    }

    return (
        <Grid>
            <GridRow centered>
                <Navbar/>
            </GridRow>
            <GridRow columns={1} centered style={{border:'2px solid red'}}>
                <CardDisplayLogic loggedInUser={props.loggedInUser} blog={props.blog} likeBlog={props.likeBlog}/>
            </GridRow>
        </Grid>
    )
};

const CardDisplayLogic = ({blog, loggedInUser, likeBlog}) => {
    const db = useResource('localHost:3003/blogs')
    const likeHandler= () => likeBlog(db, blog);

    if(!blog){
        return (
            <Segment loading>
                <img src={require('../../resources/paragraph.png')} className="ui image"/>
            </Segment>
        )
    }

    return(
        <Card fluid raised >
            <Card.Content textAlign={'left'}>
                <Image
                    floated='right'
                    size='mini'
                    src={require('../../resources/slash.png')}
                />
                <Card.Header as={Link} to={`/blogs/${blog.id}`}>{blog.title}</Card.Header>
                <Card.Meta as={Link} to={`/users/${blog.author.id}`}>by {blog.author.username}</Card.Meta>
                <Card.Description>
                    {blog.text}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' floated={'left'} onClick={likeHandler}>
                    <Button color='red'>
                        <Icon name='heart'/>
                        Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        {blog.likes}
                    </Label>
                </Button>
                <DeleteButton blog={blog} loggedInUser={loggedInUser}/>
            </Card.Content>
        </Card>
    )

};


const mapStateToProps = (state)=>{
    return{
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

export default connect(mapStateToProps, mapDispatchToProps)(OneBlogURL);