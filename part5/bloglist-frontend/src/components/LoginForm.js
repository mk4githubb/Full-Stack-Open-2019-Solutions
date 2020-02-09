import React from 'react'
import useFormHook from '../hooks/formHook'
import useResource from "../hooks/useResources";
import useFeild from "../hooks/feildHook";
import './LoginForm.css';

const LoginForm = ({syncer}) => {
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
            syncer.notificationConfig('Title or body cannot be empty');
            return false;
        } else if (username.value.length < 3 || password.value.length < 3) {
            syncer.notificationConfig("Length of username or password can't be less than 3");
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

        try {
            const returnedObject = await login.post(requestObject);
            const returnResultData = returnedObject.data;
            window.localStorage.setItem('token', JSON.stringify(returnResultData));
            username.clear();
            password.clear();
            update(returnResultData, syncer);
        } catch (exception) {
            syncer.notificationConfig('Invalid Username or Password');
            console.log('error');
        }
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

        try {
            const createdUser = await users.post(newUser);
            syncer.notificationConfig(`User created with username ${createdUser.data.username}. Please Log in.`);
            toggleSignUpLoginButton();

        } catch (exception) {
            syncer.notificationConfig(`Error Creating User`)
        }

    };

    if (signUp.value) {
        return (
            <form onSubmit={createUserHandler} className={'signUpLogInForm'}>
                <div id={'signUpFormContainer'}>
                    <div id={'username'}>
                        <label>Enter Username</label>
                        <input type={username.type} value={username.value} onChange={username.update}/>
                    </div>
                    <div id={'password'}>
                        <label>Enter Password</label>
                        <input type={password.type} value={password.value} onChange={password.update}/>
                    </div>
                    <div id={'button'}>
                        <button type={'submit'}>Sign up!</button>
                    </div>
                </div>
                <a href={'javascript:;'} onClick={toggleSignUpLoginButton}>Already a user? Log in</a>
            </form>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={'signUpLogInForm'}>
            <div id={'loginFormContainer'}>
                <div id={'username'}>
                    <label>Username</label>
                    <input type={username.type} value={username.value} onChange={username.update}/>
                </div>
                <div id={'password'}>
                    <label>Password</label>
                    <input type={password.type} value={password.value} onChange={password.update}/>
                </div>
                <div id={'button'}>
                    <button type={'submit'}>Login</button>
                </div>
            </div>
            <a href={'javascript:;'} onClick={toggleSignUpLoginButton}>Not a user? Sign up</a>
        </form>
    )
};

export default LoginForm;