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
import OneUserURL from "./New Components/OneUserURL/OneUserURL";
import OneBlogURL from "./New Components/OneBlogURL/OneBlogURL";


function App(props) {

    const blogsDB = useResource('http://localhost:3003/blogs');
    const usersDB = useResource('http://localhost:3003/users');

    useEffect(() => {
        const alreadyLoggedInUser = window.localStorage.getItem('token');

        if (alreadyLoggedInUser) {
            let parsed = JSON.parse(alreadyLoggedInUser);
            props.setLoggedInUser(parsed);
        }

        props.initBlogs(blogsDB);
        props.initUsers(usersDB);

    }, []);

    const findUserById = id => props.users.find(user => user.id == id);
    const findBlogById = id => props.blogs.find(blog => blog.id == id);

    return (
        <Container>
            <Router>
                <Route path={'/home'} render={()=><LandingPage/>}/>
                <Route exact path={'/'} render={()=> <LandingPage/>}/>
                <Route path={'/signup'} render={()=><Signup/>}/>
                <Route path={'/login'} render={()=> props.loggedInUser?<Redirect to={'/home'}/>:<Login/>}/>
                <Route path={'/about'} render={()=><About/>}/>
                <Route exact path={'/users'} render={() => <Users/>}/>
                <Route path={'/users/:id'} render={({match}) => <OneUserURL user={findUserById(match.params.id)}/>}/>
                <Route path={'/blogs/:id'} render={({match}) => <OneBlogURL blog={findBlogById(match.params.id)}/>}/>
            </Router>
        </Container>
    )
}

const mapStateToProps = (state)=>{
    return{
        blogs:state.blogs,
        loggedInUser:state.loggedInUser,
        notificationText:state.notificationText,
        users:state.users
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
