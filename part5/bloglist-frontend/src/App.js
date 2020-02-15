import React, {useEffect} from 'react';

import useResource from './hooks/useResources'
import {connect} from 'react-redux'
import {ac_setLoggedInUserFromLS} from "./reducers/loggedInUserReducer";
import {ac_setNotification_Text} from "./reducers/notificationTextReducer";
import {ac_InitBlogs} from "./reducers/blogsReducer";
import {Container, Menu} from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'
import LandingPage from "./New Components/landingPage";
import Signup from "./New Components/Signup/Signup";
import Login from "./New Components/Login/Login";
import About from "./New Components/About/About";
import Users from "./New Components/Users/Users";
import {ac_initUsers} from "./reducers/usersReducer";


function App(props) {

    const blogsDB = useResource('https://api-mk.herokuapp.com/api/blogs');
    const usersDB = useResource('https://api-mk.herokuapp.com/api/users');

    useEffect(() => {
        const alreadyLoggedInUser = window.localStorage.getItem('token');

        if (alreadyLoggedInUser) {
            let parsed = JSON.parse(alreadyLoggedInUser);
            props.setLoggedInUser(parsed);
        }

        props.initBlogs(blogsDB);
        props.initUsers(usersDB);

    }, []);

    return (
        <Container>
            <Router>
                <Route path={'/home'} render={()=><LandingPage/>}/>
                <Route exact path={'/'} render={()=> <LandingPage/>}/>
                <Route path={'/signup'} render={()=><Signup/>}/>
                <Route path={'/login'} render={()=> props.loggedInUser?<Redirect to={'/home'}/>:<Login/>}/>
                <Route path={'/about'} render={()=><About/>}/>
                <Route path={'/users'} render={() => <Users/>}/>
            </Router>
        </Container>
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
        initBlogs: (db) => dispatch(ac_InitBlogs(db)),
        initUsers:(db)=> dispatch(ac_initUsers(db))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
