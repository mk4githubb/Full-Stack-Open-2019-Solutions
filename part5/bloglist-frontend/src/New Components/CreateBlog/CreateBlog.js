import React from 'react'
import {Segment, Header, Divider, TextArea,Button} from "semantic-ui-react";

const CreateBlog = (props) => {
    return(
        <Segment centered style={{ left:'10%',width:'80%', zIndex: 1000, border:'2px solid green' }}>
            <form className="ui form">
                <Header as={'h2'} content={'Blog Title'} color={'teal'}/>
                <input/>
                <Divider/>
                <TextArea/>
                <Button />
            </form>
        </Segment>
    )

};

export default CreateBlog;

