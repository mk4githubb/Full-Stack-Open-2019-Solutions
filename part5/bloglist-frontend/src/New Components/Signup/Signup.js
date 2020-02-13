import React from 'react'
import {Grid, Header, Segment, Input, Container, Button, Image, Form, Message} from "semantic-ui-react";
import Navbar from "../Navbar";
import useFormHook from "../../hooks/formHook";
import useResource from "../../hooks/useResources";
import {ac_setNotification_Text} from "../../reducers/notificationTextReducer";
import {ac_createUser} from "../../reducers/loggedInUserReducer";
import {connect} from 'react-redux'

const Signup = (props) => {
    const username = useFormHook('text');
    const password = useFormHook('password');
    const usersDB = useResource('http://localhost:3003/api/users');


    const inputValidator = () => {
        if (!username || username.value.length === 0 || !password || password.value.length === 0) {
            props.setNotificationText('Title or body cannot be empty');
            return false;
        } else if (username.value.length < 3 || password.value.length < 3) {
            props.setNotificationText("Length of username or password can't be less than 3");
            return false;
        }
        return true
    };

    const createUserHandler = async (event) => {
        event.preventDefault();

        if (!inputValidator()) {
            return
        }

        const newUser = {
            username: username.value,
            password: password.value
        };

        props.createUser(usersDB, newUser);
    };

    return(
        <Grid>
            <Grid.Row centered>
                <Navbar/>
            </Grid.Row>
            <Grid.Row centered>
                <Grid textAlign={'center'}  style={{ height: '80vh'}} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 , minWidth: 300}}>
                        <Header as={'h2'} color='teal' textAlign={'center'}>
                            <Image src={require('../../resources/signup.png')}/> Sign Up
                        </Header>
                        <Form size='large' onSubmit={createUserHandler}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='username' onChange={username.update} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={password.update}
                                />
                                <Button color='teal' fluid size='large'>
                                    Sign up
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already a user? <a>Log in</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </Grid>

    )
};

const mapStateToProps = (state)=>{
    return{
        notificationText:state.notificationText
    }
};

const mapDispatchToProps = (dispatch)=> {
    return{
        setNotificationText:(data) => dispatch(ac_setNotification_Text(data)),
        createUser: (db, newUser) => dispatch(ac_createUser(db, newUser))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

