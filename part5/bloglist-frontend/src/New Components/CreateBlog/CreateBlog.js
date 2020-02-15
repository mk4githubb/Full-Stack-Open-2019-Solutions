import React, {useState} from 'react'
import {Segment, Header, Divider, TextArea,Button, Input, Message} from "semantic-ui-react";
import {ac_createBlog} from "../../reducers/blogsReducer";
import useResource from "../../hooks/useResources";
import {ac_setNotification_Text} from "../../reducers/notificationTextReducer";
import {connect} from 'react-redux'
import NotifMessage from "../Message/Message";
const CreateBlog = (props) => {
    const [title, setTitle] = useState(null);
    const [text, setText] = useState(null);
    const blogsDB = useResource('https://api-mk.herokuapp.com/api/blogs');

    const handleCreateBlog = (event) => {
        event.preventDefault();

        if (!title || title.value.length === 0 || !text || text.value.length === 0) {
            props.setNotificationText('Title or body cannot be empty');
            return;
        } else if (title.value.length > 50) {
            props.setNotificationText("Length of title can't exceed 50");
            return;
        } else if (text.value.length > 256) {
            props.setNotificationText("Length of title can't exceed 256");
            return;
        }

        const parsedToken = JSON.parse(window.localStorage.getItem('token'));

        const getTokenConfig = () => {
            return `bearer ${parsedToken.webToken}`
        };

        const config = {
            headers: {
                Authorization: getTokenConfig()
            }
        };

        const newBlog = {
            title: title.value,
            text: text.value,
        };

        props.createBlog(blogsDB, config, newBlog);
    };

    return(
        <Segment inverted centered style={{ left:'30%', position:'fixed', height:'50%', top:'35%' , width:'40%', zIndex: 1000, border:'2px solid green' }}>
            <NotifMessage/>
            <form className="ui form" onSubmit={handleCreateBlog}>
                <Header as={'h2'} content={'Create A Blog'} color={'teal'}/>
                <Input
                    icon='newspaper'
                    iconPosition='left'
                    label={{ tag: true, content: 'Add blog title', color:'olive'}}
                    labelPosition='right'
                    placeholder='Blog title'
                    fluid
                />
                <Divider/>
                <TextArea rows={10}/>
                <Button basic color='olive' content='Create Blog'/>
            </form>
        </Segment>
    )
};

const mapStateToProps = (state) => {

    return {
        loggedInUser: state.loggedInUser
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        createBlog: (db, config, data) => dispatch(ac_createBlog(db, config, data)),
        setNotificationText: (text) => dispatch(ac_setNotification_Text(text))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);

