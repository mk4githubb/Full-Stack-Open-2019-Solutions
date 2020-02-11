import React from 'react'
import useFormHook from '../hooks/formHook'
import useResource from "../hooks/useResources";
import useFeild from "../hooks/feildHook";
import {ac_setNotification_Text} from "../reducers/notificationTextReducer";
import {ac_logout, ac_login, ac_createUser} from "../reducers/loggedInUserReducer";
import {connect} from 'react-redux'

const LoginForm = (props) => {
    const signUp = useFeild(false);
    const username = useFormHook('text');
    const password = useFormHook('password');
    const login = useResource('http://localhost:3003/api/login');
    const users = useResource('http://localhost:3003/api/users');

    const update = (data, syncer) => {
        syncer.loggedInUserName.update(data.username);
        syncer.loggedInsName.update(data.name);
    };

    const toggleSignUpLoginButton = () => {
        username.clear();
        password.clear();
        signUp.update(!signUp.value);
    };

    const usernamePasswordValidator = () => {
        if (!username || username.value.length === 0 || !password || password.value.length === 0) {
            props.setNotificationText('Title or body cannot be empty');
            return false;
        } else if (username.value.length < 3 || password.value.length < 3) {
            props.setNotificationText("Length of username or password can't be less than 3");
            return false;
        }
        return true
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!usernamePasswordValidator()) {
            return
        }

        const requestObject = {
            username: username.value,
            password: password.value
        };

        props.login(login, requestObject);
    };

    const createUserHandler = async (event) => {
        event.preventDefault();

        if (!usernamePasswordValidator()) {
            return
        }

        const newUser = {
            username: username.value,
            password: password.value
        };

        props.createUser(users, newUser);
    };

    if (signUp.value) {
        return (
            <form onSubmit={createUserHandler}>
                <div>
                    <div>
                        <label>Enter Username</label>
                        <input type={username.type} value={username.value} onChange={username.update}/>
                    </div>
                    <div>
                        <label>Enter Password</label>
                        <input type={password.type} value={password.value} onChange={password.update}/>
                    </div>
                    <div>
                        <button type={'submit'}>Sign up!</button>
                    </div>
                </div>
                <a href={'javascript:;'} onClick={toggleSignUpLoginButton}>Already a user? Log in</a>
            </form>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div >
                <div>
                    <label>Username</label>
                    <input type={username.type} value={username.value} onChange={username.update}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type={password.type} value={password.value} onChange={password.update}/>
                </div>
                <div>
                    <button type={'submit'}>Login</button>
                </div>
            </div>
            <a href={'javascript:;'} onClick={toggleSignUpLoginButton}>Not a user? Sign up</a>
        </form>
    )
};

const mapDispatchToProps = (dispatch)=> {
    return{
        setNotificationText:(data) => dispatch(ac_setNotification_Text(data)),
        logout:() => dispatch(ac_logout()),
        login: (db, data) => dispatch(ac_login(db, data)),
        createUser: (db, newUser) => dispatch(ac_createUser(db, newUser))
    }
};

export default connect(null, mapDispatchToProps)(LoginForm);