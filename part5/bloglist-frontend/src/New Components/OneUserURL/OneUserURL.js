import {Segment, GridRow, Grid, Header, Image, List} from "semantic-ui-react";
import Navbar from "../Navbar";
import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


const OneUserURL = (props) => {

    return (
        <Grid>
            <GridRow centered>
                <Navbar/>
            </GridRow>
            <GridRow>
                <Header>{props.user.username}</Header>
            </GridRow>
            <GridRow columns={1} centered textAlign={'left'}>
                <Header as={'h1'} content={`${props.user.username}'s Blogs`} color={'teal'}/>
                <Segment>
                    <List relaxed divided>
                        <ListOFUsersBlogs list={props.user.blogPosts}/>
                    </List>
                </Segment>
            </GridRow>
        </Grid>
    )
};

const ListOFUsersBlogs = ({list}) =>{

    if(!list){
        return null;
    }
    else if (list.length == 0){
     return <Header as={'h3'} content = {"The user haven't published any blogs"}/>
    }
    return list.map(blog => <List.Item as={Link} to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</List.Item>)
};

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
};

export default connect(mapStateToProps)(OneUserURL);