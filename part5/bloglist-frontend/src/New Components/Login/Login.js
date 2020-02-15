import {Button, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import {Redirect} from "react-router";
import React from "react";
import Navbar from "../Navbar";
import useResource from "../../hooks/useResources";
import useFormHook from "../../hooks/formHook";
import {ac_setNotification_Text} from "../../reducers/notificationTextReducer";
import {ac_login,} from "../../reducers/loggedInUserReducer";
import {connect} from "react-redux";

const Login = (props) => {

    const login = useResource('http://localhost:3003/api/login');
    const username = useFormHook('text');
    const password = useFormHook('password');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputValidator()) {
            return
        }

        const requestObject = {
            username: username.value,
            password: password.value
        };

        props.login(login, requestObject);
    };

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

    return(
        <Grid>
            <Grid.Row centered>
                <Navbar/>
            </Grid.Row>
            <Grid.Row centered>
                <Grid textAlign={'center'}  style={{ height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={require('../../resources/login.png')} /> Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={handleSubmit}>
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
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </Grid>
    )
};

const mapDispatchToProps = (dispatch)=> {
    return{
        setNotificationText:(data) => dispatch(ac_setNotification_Text(data)),
        login: (db, data) => dispatch(ac_login(db, data)),
    }
};

export default connect(null, mapDispatchToProps)(Login);