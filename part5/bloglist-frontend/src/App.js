import React, {useEffect} from 'react';
import LoginForm from './components/LoginForm'
import Blog from "./components/Blog";
import LoggedInfo from './components/LoggedInfo'
import Notification from "./components/Notification";
import Header from "./components/Header";
import useResource from './hooks/useResources'
import {connect} from 'react-redux'
import {ac_setLoggedInUserFromLS} from "./reducers/loggedInUserReducer";
import {ac_setNotification_Text} from "./reducers/notificationTextReducer";
import {ac_InitBlogs} from "./reducers/blogsReducer";


function App(props) {

    const blogsDB = useResource('http://localhost:3003/api/blogs');
    const usersDB = useResource('http://localhost:3003/api/users');


    useEffect(() => {
        const alreadyLoggedInUser = window.localStorage.getItem('token');

        if (alreadyLoggedInUser) {
            let parsed = JSON.parse(alreadyLoggedInUser);
            props.setLoggedInUser(parsed);
        }

        props.initBlogs(blogsDB);

    }, []);


    return (
        <div>
            <div>
                <Header/>
                {!props.loggedInUser ? <LoginForm /> : null}
            </div>
            <Notification text={props.notificationText}/>
            {props.loggedInUser ? <LoggedInfo db = {blogsDB}/> : null}
            <div>
                {props.blogs.map(i => <Blog blog={i} db={blogsDB} key={i.id}/>)}
            </div>
        </div>
    )
}

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
        setLoggedInUser:(data)=>dispatch(ac_setLoggedInUserFromLS(data)),
        initBlogs: (db) => dispatch(ac_InitBlogs(db))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
